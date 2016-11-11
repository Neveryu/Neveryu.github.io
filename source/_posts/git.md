---
title: Git学习总结
date: 2016-10-07 13:25:24
categories: 综合
tags: [Git]
comments: false
---
## 从svn到git

两者都是优秀的版本管理工具（giter请不要鄙视svner）
* svn上手非常容易，操作简单
* git功能强大，但是要熟练使用分支不算容易

git因为是分布式的，所以其核心就是分支（只有master分支情况下和svn差不多？），分支的意义在于，可以将项目代码按照功能、模块拆分成不同的分支。比如这个产品要加一个支付功能和一个登陆功能，可以创建两个分支，交给不同的开发人员并行开发。登陆功能先开发完，测试无误后合并改分支到master分支，master分支部署上线。支付功能虽然没有开发完成，但是在另一条分支上，所以产品上线和功能开发完全不受影响。这才是分布式开发的高效模式。

被git坑了一个星期之后决心把官方文档看一下，结合实践经验进行了整理。

- - -

<!-- more -->

## 新手常见问题

1. 如何查看有哪些分支？
`git branch -a`

2. 如何强制检出/切换分支或分支指定文件
`git checkout <branch> [file] [-f]`
强制更新，以branch版本的代码为主

3. 提交代码出现冲突冲突怎么办？
`hint: Updates were rejected because the tip of your current branch is behind`
`hint: its remote counterpart. Integrate the remote changes (e.g.`
`hint: 'git pull ...') before pushing again.`
`hint: See the 'Note about fast-forwards' in 'git push --help' for details.`
先切换分支，然后拉取分支上最新的代码覆盖到本地
`git pull`
添加或者提交代码，解决冲突之后
`git push`

4. 如何新建分支
`git checkout -b <branch_name>`  
本地建立 branch 並立即切換到新分支
`git branch -m <new_name>`
修改分支名称  

5. 从远程仓库拉取代码到本地仓库，并建立跟踪关系
`git clone http://xxx.git`
或者
`get clone git@xxx.git`
然后
`git checkout -b <本地新分支名> <对应的远程分支名>`

6. 远程仓库新建了一个分支，如何更新远程分支信息
`git fetch <remote base>`

7. 如何在远程仓库新建一个分支
`git branch <branch name>`
新建一个本地分支，按照正常流程提交完代码后，推送到远程
`git push <remote base> <local branch>:<remote branch>`

## 实用指令
### reset
`git reset [file]`
取消暂存

### remote
查看远程仓库名

`git remote -v`
查看远程仓库url

`git remote add <basename> <url>`
新增远程仓库

`git remote show <basename>`
查看远程仓库详细信息

`git remote rename <old basename> <new basename>`
重命名远程仓库

### pull
相当于fetch和merge

### push
`git push [remote_branch] [local_branch]`
推送本地仓库代码到远程仓库，相当于svn的commit

`git push <remote base> [tag name]`
推送本地标签到远程仓库

`git push <remote base> <remote branch>:<local branch>`
将本地分支推送到指定的远程分支

`git push <remote base> --delete <remote branch>`
删除远程分支

### tag
查看标签（用来标记标志性的稳定版本信息）

`git tag -l '[expression]'`
查看那符合正则表达式的

`git tag -a <tag name> -m <comment>`
添加带注释的标签

`git tag -a <tag name> <md5>`
对某个版本打标签

`git tag [tag name]`
如果没有标签名，则为查看所有标签。带标签名则为新建标签

### merge
`git merge <branch name>`
将其他分支合并到本分支

### commit
`git commit -a -m 'xx'`
暂存并提交

### branch
`git branch`
查看本地仓库分支

`git branch -v`
查看本地仓库分支最后一次提交情况

`git branch -vv`
查看分支跟踪情况

`git branch <branch name>`
新建分支

`git branch -d <branch name>`
删除分支

`git branch [--merged | --no-merged]`
查看已合并|未合并的本地仓库分支

`git branch -u <remote base>/<remote branch>`
修改当前跟踪分支

### commit
`git commit -a -m 'xx'`
提交并且暂存暂存的方法

### checkout
`git checkout -- [file]`
恢复文件

`git checkout -b [branchname] [tagname]`
在特定的版本上创建一个新的分支并切换到此分支

`git checkout -b [local branch] [remote base]/[remote branch]`
将远程分支检出到本地分支

`git checkout --track <remote base>/<remote branch>`
让当前分支跟踪远程分支


`git checkout --track <remote base>/<remote branch>`
`git checkout -b <local branch> <remote base>/<remote branch>`
让当前分支跟踪到远程分支。两条命令作用基本一致，不同的是第二条命令可以重命名检出的分支。

### rebase
`git rebase [basebranch]`
变基是将一系列提交按照原有次序依次应用到另一分支上，而合并是把最终结果合在一起。

## 小技巧

### 查看配置
`git config -1`

### 设置git push 默认
`git config --global push.default current`

### 设置别名
`git config --global alias.<name> <commend>`
我的设置：
`git config --global alias.st status`
`git config --global alias.cm "commit -m"`
`git config --global alias.ph "push origin <local_repository>:<remote_repository>"`

### 保存用户名和密码

#### 对于http(s)协议，可以用下面命令临时缓存
`git config --global credential.helper cache`
开启linux缓存
`git config --global credential.helper wincred`
开启windows缓存
#### 对于ssh协议，可以用ssh  key，具体教程网上很多

### 忽略文件
默认方法是在当前项目目录下创建一个.gitignore文件，如果需要忽略的文件已经添加到版本库中，请先移除
`git rm --cached [file]`
不删除文件，只移除追踪。

[权威教程](http://git-scm.com/book/zh/v2)
