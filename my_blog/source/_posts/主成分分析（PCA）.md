---
title: 主成分分析（PCA）
date: 2022-11-02 12:32:24
tags:
- 涨知识
categories:
- [机器学习]
- [无监督学习]
toc: true
---

主成分分析（principal component analysis, PCA）是一种常用的无监督学习方法，这一方法利用正交变换把由线性相关变量表示的观测数据转换为少数几个由线性无关变量表示的数据，线性无关的变量称为主成分。主成分的个数通常小于原始变量的个数，所以主成分分析属于降维方法。

本文主要针对使用和实现进行介绍，如果想要针对算法推导过程进行学习，可以参考李航老师的《统计学习方法》。
<!-- more -->
## 原理介绍

主成分分析方法就是将原始数据通过正交变化的方法投影到方差最大的几个方向上，每一个方向也就是一个主成分。
关于方差最大的解释。假如有两个变量x1 和 x2，三个样本点 A、B、C，样本分布在由 x1 和 x2 组成的坐标系中。对该数据集进行降维处理为一维，就是找到一个投影之后使得三个数据点方差最大也就是投影到 y1 上使得 $OA_1^2 + OB_1^2 + OC_1^2$ 的平方和最大，根据勾股定理也就是$AA_1^2 + BB_1^2 + CC_1^2$ 平方和最小。所以等价的主成分分析在旋转变化中选取离样本点的距离平方和最小的轴作为第一主成分；第二主成分，即在第一主成分固定的情况下类似。

![](/images/PCA/PCA.png)

## 与 t-SNE 方法进行对比

t-SNE 是一种非线性的降维技术，而 PCA 基于正交变换是一种线性的降维技术。t-SNE 工作原理的简要介绍：
- 该算法一开始通过计算在高维空间中的数据点的相似度概率和与其对应的低维空间中的点的相似度的概率。点的相似度计算方法是：以A为中心的高斯分布中，如果按概率密度的比例选取相邻点，则点A将选择点B作为其相邻点的条件概率，以此计算点A的相似性。
- 为了更好将数据投影至低维空间中，算法尝试去最小化高维数据空间和低维数据空间之间的条件概率（相似度）之差。
- 为了评估t-SNE条件概率差和的最小化，使用梯度下降的方法最小化原分布中数据与映射分布中的对应数据的KL散度的总和。

在高维数据的聚类分析中，往往是二者结合，先通过 PCA 将数据降维到较低维，再通过 t-SNE 进行降维。

## 算法过程

1. 按照下式进行规范化处理，得到规范化矩阵 X。
$$ x_{ij} = \frac{x_{ij} - \bar x}{\sqrt{s_{ij}}}$$
其中
$$ \bar x = \frac{1}{n} \sum_{j=1}^{n} x_{ij} $$
$$ s_{ij} = \frac{1}{n-1} \sum_{j=1}^{n}(x_{ij} - \bar x_i)^2 $$

2. 依据规范化矩阵，计算样本相关矩阵 R
$$R = [r_{ij}]_{m \times m} = \frac{1}{n-1}XX^T$$
其中
$$r_{ij} = \frac{1}{n-1} \sum_{l=1}^{n}x_{il}x_{lj}$$

3. 求样本相关矩阵 R 的 k 个特征值和对应的 k 个单位特征向量
求解 R 的特征方程
$$|R - \lambda I| = 0$$
得 R 的 m 个特征值
$$\lambda_1 \geq \lambda_2 \geq ... \geq \lambda_m$$
求方差贡献率 $\sum_{i=1}^k \eta_i$达到预定值的主成分个数 k
求前 k 个特征值对应的特征向量 $a_i$。

4. 求 k 个样本主成分
以 k 个单位特征向量为系数进行线性变换，求出 k 个样本成分
$$y_i = a_i^Tx$$

PS：
其中关于特征值的求法也对应了两种 PCA 的实现方式，上述的求法是通过计算相关矩阵计算，而另一种方法是通过奇异值分解的方法计算特征值。


## 手写实现 PCA

``` python
class PCA():
    # 计算协方差矩阵
    def calc_cov(self, X):
        m = X.shape[0]
        # 数据标准化
        X = (X - np.mean(X, axis=0))  / np.var(X, axis=0)
        return 1 / m * np.matmul(X.T, X)
    
    # 根据累计方差贡献率选择特征
    def select_by_per(self, eigVals, percentage):
        eigVals_sort = sorted(eigVals, reverse=True)
        eigVals_sum = sum(eigVals)
        n = 0
        sum_per = 0
        for i in eigVals_sort:
            n += 1
            sum_per += i / eigVals_sum
            if sum_per >= percentage:
                return n

    def pca(self, X, n_components=None, percentage=None):
        # 计算协方差矩阵
        cov_matrix = self.calc_cov(X)
        # 计算协方差矩阵的特征值和对应特征向量
        eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)
        # 对特征值排序
        idx = eigenvalues.argsort()[::-1]
        # 取最大的前n_component组
        eigenvectors = eigenvectors[:, idx]
        if  percentage:
            print(eigenvalues)
            n_components = self.select_by_per(eigenvalues, percentage)
        print(n_components)
        eigenvectors = eigenvectors[:, :n_components]
        # Y=PX转换
        return np.matmul(X, eigenvectors)
```

关于代码完整实现可以参考我的 [github](https://github.com/LALBJ/Deep-Learning-Models-Pytorch/blob/master/UL/decomposition/PCA.ipynb) 

## 使用技巧
1. 关于数据是采用规范化处理还是均值0化处理：关于该问题的详细讨论可以参考后面附的参考文献，这个问题的结论的话呢就是具体问题具体分析。如果你想要消除不同单位及量级对于降维结果的影响就使用规范化的处理，否则就采用均值0化的处理；如果数据的特征由多个不同单位的特征，采用规范化处理一般会更好。这里举个例子，对于一个以千米作为单位的特征，如果将其转化为毫米，特征的方差就会变大，因此该特征对于降维结果的贡献度也就越高了。
2. PCA 处理过程的特征值代表特征的重要程度，特征向量代表不同特征对于特征值的贡献度，如果使用 sklearn 的话可以使用 .components_ 这一 API 输出各个特征对于主成分的贡献度。
3. 与聚类方法结合进行使用，这个也是引起广泛讨论的一个问题，将数据降维结果进行聚类是否合理？关于这一问题的答案是，不合理。因为无论是 PCA 还是 t-SNE 在进行降维的过程中都损失了一些高维空间距离信息，针对于这个结果再进行降维处理显然是不合理的

## 参考文献
1. 《统计学习方法》
2. [Why do you need to standardize of your data before you apply a PCA?](https://www.quora.com/Why-do-you-need-to-standardize-zero-mean-unit-variance-of-your-data-before-you-apply-a-PCA-Which-important-assumptions-does-PCA-make)
3. [Clustering on the output of t-SNE](https://stats.stackexchange.com/questions/263539/clustering-on-the-output-of-t-sne)