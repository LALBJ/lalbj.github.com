---
title: Generative Adversarial Nets(GAN) 论文精读
date: 2022-11-23 10:41:55
tags:
---

GAN 自提出之后近几年一直是一个充满热度的话题，而这篇论文的一作也是大名鼎鼎的花书的作者。

## 摘要

我们提出了一个通过对抗过程估计生成模型的新框架，其中我们同时训练两个模型：一个生成模型 G 捕获数据分布，另一个判别模型 D 估计样本来自训练数据而不是由 G 生成的概率。 G 的训练过程是最大化 D 出错的概率。该框架对应于极小极大两人博弈。在任意函数 G 和 D 的空间中，存在一个唯一解，G 恢复训练数据分布，D 处处等于 $\frac{1}{2}$。在 G 和 D 由多层感知器定义的情况下，整个系统可以通过反向传播进行训练。在训练或生成样本期间，不需要任何马尔可夫链或展开的近似推理网络。实验通过对生成样本的定性和定量评估来证明该框架的潜力。

## 引言

在过去深度学习模型在判别模型上取得了显著的成功，但是在生成模型上受制于逼近最大似然估计等策略使得生成模型难以复现并借鉴判别模型的成功经验。在本文中，作者提出了一种新的生成模型框架规避了这些问题。

作者举了一个非常形象的例子介绍生成模型与判别模型：生成模型可以被认为是造假币的团队，并且试图制造假币并且在不被发现的情况下使用它，而判别模型类似于警察，试图检测假币。在对抗过程中驱使这两个模型不断改进他们的方法，直到假币和真币无法区分。

通过这种框架能够基于反向传播算法和 dropout 训练这两个模型即这两个 MLP。并不需要近似推理或者马尔可夫链。

## 相关工作

4相关工作

﻿
10:42
﻿

版本：NIPS final version，arxiv 早期版本

相关工作 的 区别，未参考别人工作，大佬！高级高级！



Related work 第一段：先说别人的问题，我们怎么做？



别人的问题在哪里呢？

构造 有参数的 概率分布函数，provide a parametric specification of a probability distribution function 



参数构造了，怎么学习呢？

maximizing the log-likelihood，但采样分布计算难， esp 维度高， i.e., DBM。



怎么解决这个计算难的问题？当然是不要 分布 啦

直接学习一个模型，近似数据分布。



DBM 和 我们的 generative models 有什么区别？

DBM：一定要学 分布，知道均值、方差等一系列参数

GAN：用一个模型学习 你想要的结果，答对题就行。



GAN 的好处和坏处是什么呢？

pros: 计算容易；
               

cons: 即使答对了题，GAN 不知道正确的分布长什么样。


Related work 第二段：误差反向传递对 GAN 进行求解



Why error BP 有效？

对 f 的期望求导 == 对 F 自己求导





Related work 第三段：unaware 别人的类似工作，VAE



Related work 第四段：从 discriminative 角度 to train a generative model 的相关工作



GAN 和 Noise-contrastive estimation (NCE) 的区别？

NCE 的损失函数复杂一点 --> 求解性能不如 GAN



Related work 第五段：和 predictability minimization 1992的区别



Jürgen (LSTM作者) 有非常超前的工作，LSTM在当年的计算量和数据量的条件，很难大展身手。现在，LSTM 效果被发现了。



Jürgen predictability minimization算法被埋没了，Jürgen 认为 GAN 是 reverse PM。



轶事：Jürgen 在GAN 的 NIPS 汇报，也提出质疑。Ian 回绝，邮件交流已经很清楚了，你在耽搁大家学习 GAN



Remark：一个真实有用的技术，会在不同领域、不断的被人重新发现，给予新的名词。大家会把功劳归给那一个教会了大家这个算法的人，而不是最早发明它的人。





Related work 第六段：和 adversarial examples 的区别

﻿
15:25
﻿

adversarial examples 测试算法的稳定性，how？

构造一些假的、跟真的样本长得很像的 样本，能糊弄到分类器。


## GAN 的目标函数

生成器的目标是学习训练数据 $x$ 的数据分布情况，生成器的概率分布用 $p_g$ 表示。生成器的输入是一个噪声分布 $p_z(z)$，然后将其映射到数据空间表示为 $G(z;\theta_g)$，其中 $G$ 是一个可微的函数，由参数为 $\theta_g$ 的多层感知机表示。输出单个标量的判别模型被表示为$D(x;\theta_d)$。$D(x)$ 表示 $x$ 来自于数据分布而不是 $p_g$ 的概率。我们训练 $D$ 以最大化将正确标签分配给来自 $G$ 的样本的概率。我们同时训练 $G$ 以最小化 $log(1-D(G(z)))$。换句话说，这个过程可以被视为 $G$ 和 $D$ 在玩具有价值函数 $V(G, D)$ 的两人极小极大游戏：

$\mathop{min}\limits_{G}\mathop{max}\limits_{D}V(D, G) = \mathbb{E}_{x \sim p_{data(x)}}[logD(x)] + \mathbb{E}_{z \sim p_{z(z)}}[logD(1 - logD(G(z)))]$

在训练的过程中优化 $D$ 非常容易过拟合而且计算量很大。所以通过超参数 $k$ 控制 $D$ 的优化，并且优化 $D$ 的 $k$ 步和优化 $G$ 的一步交替进行。


![](/images/GAN/GAN.png)

上图中蓝色的虚线表示判别模型的分布情况，绿色的实现表示生成模型的分布，黑色的点线表示真实数据的分布。下方的 $z$ 轴表示均匀采样的噪声点，向上的线表示映射 $x = G(z)$ 即如果对噪声点施加生成模型的分布 $p_g$。(a) 表示奖将近收敛的对抗模型情况：$p_g$与 $p_{data}$ 相似，$D$ 是准确的分类器(b)$D$模型收敛到$D(x) = \frac{p_{data}(x)}{p_{data}(x)+p_g(x)}$。(c)在更新$G$ 后，$D$的梯度引导$G(z)$流入更有可能被归类为数据分布的区域。(d)经过几个步骤的训练，如果 $G$ 和 $D$ 有足够的能力，他们将达到一个目标点，此时 $p_g=p_{data}$。鉴别器无法分类两个分布$D(x)=\frac{1}{2}$

## 理论推导

### 全局的最优目标是 $p_g = p_{data}$

Proposition: 我们首先定义对于给定的 $G$，判别器 $D$ 可以被表示为 $D^*_{G}(x) = \frac{p_{data}(x)}{p_{data}(x) + p_g(x)}$

Proof:不考虑生成器 $G$的情况下，判别器$D$的训练目标是最大化 $V(G, D)$

$V(D, G) = \int_xp_{data}(x)logD(x) dx + \int_z p_z(z)log(1 - D(G(z)))dz
\\=\int_xp_{data}(x)logD(x)  +  p_g(x)log(1 - D(x))dx$

现在给出上式的解释，首先第一步就是将期望转换为积分的形式；第二步，因为我们这里考虑的是任意生成器 $G$ 所以可以使用换元替换。上式的最终形式可以被表示为 $y \rightarrow alog(y) + blog(1-y)$，而它的最大值为 $\frac{a}{a+b}$

基于上面的推论，我们的生成器 $G$ 的目标函数可以被表示为 $C(G)$，

$C(G) = \mathbb{E}_{x \sim p_{data(x)}}[D_G^*(x)] + \mathbb{E}_{z \sim p_{z(z)}}[log(1 - D_G^*(x))]$

Theorem: 当且仅当 $p_g = p_{data}$ 时， $C(G)$ 才能达到全局的最小值。此时，$C(G)$ 的值为 $-log4$。

Proof: 通过上面的证明，当 $p_g = p_{data}$ 时，$D_G^*(x) = \frac{1}{2}$，即

$\mathbb{E}_{x \sim p_{data(x)}}[-log2] + \mathbb{E}_{z \sim p_{z(z)}}[-log2] = -log4$

因此我们的目标函数可以被表示为

$C(G) = -log4 + KL(p_{data} || \frac{p_{data} + p_g}{2}) + KL(p_{g} || \frac{p_{data} + p_g}{2})$

### GAN 所提出的算法具有收敛性

Proposition：当 G 和 D 有足够的能力的时候，在 GAN 算法的每一步，判别器 D 是可以达到最优解的，而 $p_g$ 的训练目标是提升

$\mathbb{E}_{x \sim p_{data(x)}}[D_G^*(x)] + \mathbb{E}_{z \sim p_{z(z)}}[log(1 - D_G^*(x))]$

直到 $p_g$ 收敛到 $p_{data}$

Proof：将 $V(G, D)$ 看成 $U(p_g, D)$，是一个关于 $p_g$ 的函数。

之前：在一个高维的值空间做迭代

现在：在一个函数空间做梯度下降

