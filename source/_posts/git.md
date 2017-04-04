---
title: Git学习总结
date: 2016-10-07 13:25:24
categories: 综合
tags: [Git]
comments: false
---
## git 简介

git 是分布式的，所以其核心就是分支，分支的意义在于，可以将项目代码按照功能、模块拆分成不同的分支。比如这个产品要加一个支付功能和一个登陆功能，可以创建两个分支，交给不同的开发人员并行开发。登陆功能先开发完，测试无误后合并改分支到 master 分支，master 分支部署上线。支付功能虽然没有开发完成，但是在另一条分支上，所以产品上线和功能开发完全不受影响。这才是分布式开发的高效模式。
在 git 中，工作目录下面的所有文件都不外乎这两种状态：**已跟踪**或**未跟踪**。已跟踪的文件是指本来就被纳入版本控制管理的文件，在上次快照中有它们的记录，工作一段时间后，它们的状态可能是未更新，已修改或者已放入暂存区。而所有其他文件都属于未跟踪文件。它们既没有上次更新时的快照，也不在当前的暂存区域。初次克隆某个仓库时，工作目录中的所有文件都属于已跟踪文件，且状态为未修改。

<!-- more -->

## 实用指令详解
### merge
通常，合并分支时，如果可能，Git 会用 Fast froward 模式，但这种模式下，删除分支后，会丢掉分支信息。
如果要强制禁用 Fast forward 模式，Git 就会在 merge 时生成一个新的 commit ，这样，从分支历史上就可以看出分支信息。
`git merge --no-ff -m 'merge  with no-ff' dev`
因为本次合并要创建一个新的 commit，所以加上 -m 参数，把 commit 描述写进去。

合并分支时，加上 `--no-ff` 参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而 fast forward 合并就看不出来曾经做过合并。

### fetch
一旦远程主机的版本库有了更新(git 术语叫做 commit)，需要将这些更新取回本地，这时就要用到 git fetch 命令。
`git fetch <远程主机名>`
上面命令将某个远程主机的更新，全部取回本地。
默认情况下，git fetch 取回所有分支(branch)的更新。如果只想取回特定分支的更新，可以指定分支名。
`git fetch <远程主机名> <分支名>`
比如，取回 origin 主机的 master 分支
`git fetch origin master`
所取回的更新，在本地主机上要用“远程主机名/分支名”的形式读取。比如 origin 主机的 master，就要用 origin/master 读取。

`git fetch -p` ：取回远程更新，删除不存在的分支。


### pull
git pull 命令的作用是，取回远程主机的某个分支的更新，再与本地的指定分支合并，完整格式如下：
`git pull <远程主机名> <远程分支名>:<本地分支名>`
比如，取回origin主机的next分支，与本地的master分支合并，需要写成下面这样。
`git pull origin next:master`
如果远程分支是与当前分支合并，则冒号后面的部分可以省略。
`git pull origin master`
上面的命令表示，取回 origin/master 分支，再与当前分支合并。实质上，这等同于先做 git fetch，再 merge。
``` bash
git fetch origin
git merge origin/master
```
在某些场合，git 会自动在本地分支与远程分支之间，建立一种追踪关系(tracking)。比如，在 git clone 的时候，所有本地分支默认与远程主机的同名分支，建立追踪关系，也就是说，本地的 master 分支自动“追踪” origin/master 分支。
git 也允许手动建立追踪关系。
`git branch --set-upstream master origin/next`
上面的命令指定 master 分支追踪 origin/next 分支。
如果当前分支与远程分支存在追踪关系，git pull 就可以省略远程分支名。
`git pull origin`
上面命令表示，本地的当前分支自动与对应的 origin 主机“追踪分支”(remote-tracking branch)进行合并。
如果当前分支只有一个追踪分支，连远程主机名都可以忽略。
`git pull`
上面命令表示，当前分支自动与唯一一个追踪分支进行合并。
如果合并需要采用 rebase 模式，可以使用 -rebase 选项。
`git pull --rebase <远程主机名> <远程分支名>:<本地分支名>`

### push
git push 命令用于将本地分支的更新，推送到远程主机。它的格式与 git pull 命令相仿。
`git push <远程主机名> <本地分支名>:<远程分支名>`
如果省略远程分支名，则表示将本地分支推送与之存在“追踪关系”的远程分支(通常两者同名)，如果该远程分支不存在，则会被新建。
`git push origin master`
上面命令表示，将本地的 master 分支推送到 origin 主机的 master 分支。如果后者不存在，则会被新建。
**如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。**
`git push origin :master`
等同于
`git push origin --delete master`
上面命令表示删除 origin 主机的 master 分支。
如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略。
`git push origin`
上面命令表示，将当前分支推送到 origin 主机的对应分支。
如果当前分支只有一个追踪分支，那么主机名都可以省略。
`git push`
如果当前分支与多个主机存在追踪关系，则可以使用-u选项指定一个默认主机，这样后面就可以不加任何参数使用 git push 。
`git push -u origin master`
上面的命令将本地 master 分支推送到 origin 主机，同时指定 origin 为默认主机，后面就可以不加任何参数使用 git push 了。
不带任何参数的 git push ，默认只推送当前分支，这叫做 simple 方式。此外，还有一种 matching 方式，会推送所有有对应的远程分支的本地分支。
git 2.0 版本之前，默认采用 matching 方式，现在改为默认采用 simple 方式，如果要修改这个设置，可以采用 git config 命令。
`git config --global push.default matching`
或者
`git config --global push.default simple`
还有一种情况，就是不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机，这时需要使用 -all 选项。
`git push --all origin`
上面命令表示，将所有本地分支都推送到 origin 主机。
如果远程主机的版本比本地版本更新，推送时 git 会报错，要求先在本地做 git pull 合并差异，然后再推送到远程主机。这时，如果你一定要推送，可以使用 -force 选项。
`git push --force origin`
上面命令使用-force选项，结果导致在远程主机产生一个“非直进式”的合并(non-fast-forward merge)。除非你很确定要这样做，否则应该尽量避免使用 -force 选项。
最后，git push 不会推送标签(tag)，除非使用 -tags 选项。
`git push origin --tags`

### log
`git log` 命令可以查看历史记录，`git log` 命令显示从最近到最远的提交日志；
如果嫌输出信息太多，看得眼花缭乱的，可以试试 `git log --pretty=oneline` 。我们可以看到当前版本以及之前的版本日志以及版本号。
用 `git log --graph` 命令可以看到分支合并图。
或者两个参数一起用：
`git log --graph --pretty=oneline`
`git log --graph --pretty=oneline --abbrev-commit`
首先，git 必须知道当前版本是哪个版本，在 git 中，用 HEAD 表示当前版本，上一个版本就是 `HEAD^` ，上上一个版本就是 `HEAD^^` ， 当然往上100个版本写100个 `^` 比较容易数不过来，所以写成 `HEAD~100` 。
现在，我们要把当前版本回退到上一个版本，就可以使用 `git reset` 命令：
`git reset --hard HEAD^`
当你回退到了某个版本后，`git log` 只能显示此版本及之前的版本的日志，之后的版本日志就看不到了，但是，我们想恢复到之后教新的版本怎么办？
Git 提供了一个命令 `git reflog` 用来记录你的每一次命令

### tag
查看标签（用来标记标志性的稳定版本信息）
发布一个版本时，我们通常先在版本库中打一个标签(tag)，这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。
相比于 commit 的版本号(40位16进制)，标签号则要好使的多。
所以，tag 就是一个让人容易记住的有意义的名字，它跟某个 commit 绑定在一起。

`git tag [tag name]`
如果没有标签名，则为查看所有标签，带标签名则为新建标签

`git tag <tag name>` 就可以打一个新标签

还可以创建带有说明的标签，用 -a 指定标签名，-m 指定说明文字。
`git tag -a <tag name> -m <comment>` ：添加带注释的标签
eg: `git tag -a v1.2 -m 'version 1.2 released'`

`git tag -a <tag name> <md5>` ：对某个版本打标签
默认标签是打在最新提交的 commit 上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？
方法是找到历史提交的 commit id，然后打上就可以了。
`git log --pretty=oneline --abbrev-commit`
比方说要对 add merge 这次提交打标签，它对应的 commit id 是 6224937，那么我们就可以使用命令：
`git tag v1.2 6224937`
再用命令 `git log` 查看标签

可以用 `git show <tagname>` 查看标签信息

如果标签打错了，也可以删除：
`git tag -d v1.2`

如果要推送某个标签到远程，使用命令 `git push origin <tagname>`
eg: `git push origin v1.2`

如果标签已经推送到远程，要删除远程标签就要麻烦一点，先从本地删除：
`git tag -d v1.2`
然后，从远程删除；删除命令也是 push ，但是格式如下：
`git push origin :ref/tags/v1.2`

`git tag -l '[expression]'`
查看那符合正则表达式的

### stash
`git stash`
备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到 Git 栈中。
`git stash pop` 
从 Git 栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个 stash 的内容，所以用栈来管理，pop 会从最近的一个 stash 中读取内容并恢复。
`git stash list`
显示 Git 栈中内的所有备份，可以利用这个列表来决定从哪个地方恢复。
`git stash clear` : 清空 Git 栈。


使用 git 的时候，我们往往使用 branch 解决任务切换问题，例如，我们往往会建一个自己的分支去修改和调试代码，如果别人或者自己发现原有的分支上有个不得不修改的 bug，我们往往会把完成一半的代码 commit 提交到本地仓库，然后切换分支去修改 bug，改好之后再切换回来。这样的话往往 log 上会有大量不必要的记录。其实如果我们不想提交完成一半或者不完善的代码，但是却不得不去修改一个紧急 bug，那么使用 git stash 就可以将你当前未提交到本地的代码推入到 git 的栈中，这时候你的工作区间和上一次提交的内容是完全一样的，所以你可以放心的修 bug，等到修完 bug，提交到服务器上后，再使用 git stash apply 将以前一般的工作应用回来。也许有的人会说，那我可不可以多次将未提交的代码压入到栈中？答案是可以的。当你多次使用 git stash 命令后，你的栈里将充满了未提交的代码，这时候你会对将哪个版本应用回来有些困惑， git stash list 命令可以将当前的 Git 栈信息打印出来，你只需要将找到对应的版本号，例如使用 `git stash apply stash@{1}` 就可以将你指定版本号为 stash@{1} 的工作取出来，当你将所有的栈都应用回来的时候，可以使用 git stash clear 来将栈清空。
在这里顺便提下 git format-patch -n , n是具体某个数字， 例如 'git format-patch -1' 这时便会根据log生成一个对应的补丁，如果 'git format-patch -2' 那么便会生成 2 个补丁，当然前提是你的 log 上有至少有两个记录。

看过上面的信息，就可以知道使用场合了：当前工作区内容已被修改，但是并未完成。这时 Boss 来了，说前面的分支上面有一个 bug，需要立即修复。可是我又不想提交目前的修改，因为修改没有完成。但是，不提交的话，又没有办法 checkout 到前面的分支。此时用 git stash 就相当于备份了工作区了。然后在 checkout 过去修改，就能够达到保存当前工作区，并及时恢复的作用。

注意这里由于只 stash 了一次所以要使用 pop，具体你存放了多少。

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

### commit
`git commit -a -m 'xx'`
暂存并提交

### branch
`git branch`
查看本地仓库分支

`git branch -r`
查看远程分支情况

`git branch -a`
查看本地和远程的所有分支情况

`git branch -v`
查看本地仓库分支最后一次提交情况

`git branch -vv`
查看分支跟踪情况

`git branch <branch name>`
新建分支

`git branch -d <branch name>`
删除分支

`git branch -D <branch name>`
强制删除分支

`git branch [--merged | --no-merged]`
查看已合并|未合并的本地仓库分支

`git branch -u <remote base>/<remote branch>`
修改当前跟踪分支

### checkout
`git checkout -- [file]` ：恢复文件
`git checkout -- demo.html` 意思就是，把 `demo.html` 文件在工作区的修改全部撤销，这里有两种情况：
一种是 `demo.html` 自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是 `demo.html` 已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加暂存区后的状态。
总之，就是让这个文件回到最后一次 `git commit` 或 `git add` 时的状态。

但是如果 `git add` 到暂存区了，在 commit 之前，想撤销：
Git 同样告诉我们，用命令 `git reset HEAD file` 可以把暂存区的修改撤销掉(unstage)，重新放回工作区。
`git reset` 命令既可以回退版本，也可以把暂存区的修改回退到工作区，当我们用 `HEAD` 时，表示最新的版本。
再用 `git status` 查看一下，现在暂存区是干净的，工作区有修改：
还记得如果丢弃工作区的修改吗？
对的，使用：`git checkout -- demo.html` 

`git checkout` 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以"一键还原"。

`git checkout -b [branchname] [tagname]`
在特定的版本上创建一个新的分支并切换到此分支

`git checkout -b [local branch] [remote base]/[remote branch]`
将远程分支检出到本地分支，并追踪

`git checkout --track <remote base>/<remote branch>`
让当前分支跟踪远程分支

### rebase
`git rebase [basebranch]`
变基是将一系列提交按照原有次序依次应用到另一分支上，而合并是把最终结果合在一起。

## 常见问题

### git clone
git clone 支持多种协议，除了HTTP(s)以外，还支持SSH、Git、本地文件协议等。
使用 https 除了速度慢意外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放 http 端口的公司内部就无法使用 ssh 协议而只能用 https。

`git clone <版本库的网址> <本地目录名>`
如果不写本地目录名，默认就是版本库的名字


### 如何新建分支
本地建立 branch 並立即切换到新分支
`git checkout -b <branch_name>` 

下面的命令表示，在 `origin/master` 的基础上，创建一个分支。
`git checkout -b newBranch origin/master`

修改分支名称  
`git branch -m <new_name>`

### 从远程仓库拉取代码到本地仓库，并建立跟踪关系
`git checkout -b <本地新分支名> <对应的远程分支名>`

### 如何在远程仓库新建一个分支
新建一个本地分支，按照正常流程提交完代码后，推送到远程
`git push <remote base> <local branch>:<remote branch>`

### 比较文件
`git diff HEAD -- demo.html` 
命令可以查看工作区的 demo.html 和版本库里面最新版本的区别。

### 忽略某些文件
默认方法是在当前项目目录下创建一个 .gitignore 文件，如果需要忽略的文件已经添加到版本库中，请先移除
`git rm --cached [file]`
不删除文件，只移除追踪。
```
cat .gitignore
*.[oa]
*~
```

文件 .gitignore 的格式规范如下：
- 所有空行或者以注释符号 # 开头的目录都会被 git 忽略
- 可以使用标准的 glob 模式匹配
- 匹配模式最后跟反斜杠（`/`）说明要忽略的目录
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（`!`）取反

### bug 分支
git 提供了一个 stash 功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。
`git stash`
修改完 bug 后，回到当前分支上继续干活，工作区是干净的，刚才的工作现场存到哪里去了？
`git stash list` ：查看 stash 列表(stash 是一个栈的结构)
git 把 stash 内容存在某个地方了，但是需要恢复一下，有两个办法：
一是用 `git stash apply` 恢复，但是恢复后，stash 内容并不删除，你需要用 `git stash drop` 来删除；
另一种方式是用 `git stash pop` ，恢复的同时把 stash 内容也删了；
你可以多次 stash ，恢复的时候，先用 `git stash list` 查看，然后恢复指定的 stash，用命令：
`git stash apply stash@{0}`

### 配置文件
配置 Git 的时候，加上 --global 是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。
配置文件放哪了？
每个仓库的 Git 配置文件都放在 .git/config 文件中，在这份配置文件中，别名就在 [alias] 后面，要删除别名，直接把对应的行删掉即可。

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
#### 对于 ssh 协议，可以用 ssh key，具体教程网上很多




## 解决问题
### 问题一
git 中执行命令 `add .`  
报错：Unlink of file 'templates/opms.exe' failed.Should I try again?(y/n)

因为这个文件正在被占用，所以不能添加到暂存区，而正好这个 `.exe` 文件，我们是不需要添加到版本管理工具的。所以我们选择 `n` 。

### 问题二
git 中生成 sshkey: `ssh-keygen -t rsa -C "youremail"`
这个`email`并没有什么用
所以我们使用`ssh-keygen -t rsa`来生成sshkey就可以了。
然后git中的配置文件：
`git config --list`
`git config --global user.name "yu"`
`git config --global user.email "react.dong.yu@gmail.com"`
这种配置将会对本地所有的git仓库有效。
那么在 push 的时候，远程就知道这个push来自于哪个email.
但有时候在公司的时候，有的仓库是公司的，有的仓库是自己github的。
这个时候就可以不设置global的配置了，而是在自己的仓库中设置
`git config --local user.email "react.dong.yu@gmail.com"`

### 问题三
使用 windows 的同学注意了，如果你在资源管理器里新建一个 .gitignore 文件，它会提示你必须输入文件名，但是在文本编辑器里“保存”或者“另存为”就可以把文件保存为 .gitignore 了。
有些时候，你想添加一个文件到 git，但发现添加不了，原因是这个文件被 .gitignore 忽略了：
`git add App.class`
如果你确实想添加该文件，可以用 -f 制添加到 git：
`git add -f App.class`
或者你发现，可能是 .gitignore 写得有问题，需要找出来到底哪个规则写错了。
可以用 `git check-ignore` 命令检查：
`git check-ignore -v App.class`

### 问题四
为什么我把我生成的 ssh key 添加到了 github 中
然后 也 remote 了 `https://github.com/Neveryu/Xxx.git`
为什么提交的时候报错，或者提示 输入密码账号是为什么

ssh key 是 ssh 协议的密钥，http 协议没权限



[权威教程](http://git-scm.com/book/zh/v2)
[Pro Git 简体中文版](http://iissnan.com/progit/)
