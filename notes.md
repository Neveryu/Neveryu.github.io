# About

## 1、start-server-and-test

> 本项目使用的版本是：`start-server-and-test@2.0.11`

### 介绍
在开发Web应用程序时，启动服务和执行测试是两个常见的任务，它们通常需要相互配合。`start-server-and-test` 是一个强大的 NPM 包，旨在简化这个过程，它允许您启动服务器，等待特定URL响应，然后运行测试命令，并在测试完成后优雅地关闭服务器。这个工具特别适用于集成测试环境和持续集成流程。


### 技术分析
`start-server-and-test` 基于以下核心特性：

- 智能监控：它可以监测指定的URL或端口，确保服务器已准备就绪。
- 灵活执行：您可以提供自定义的启动脚本和测试命令，支持全局或局部安装的工具。
- 自动关机：测试完成后，它会自动停止服务器，保持干净的工作环境。
- 适配多种场景：兼容多种测试框架，如Mocha、Jest等，以及任何可以作为NPM脚本执行的命令。

`hexo` 运行的本地项目，是没有实时更新的功能，需要手动刷新页面；`gulp` 生态中有一个 `browser-sync` 包可以实现监听文件变化来自动刷新页面；

本项目中使用 `start-server-and-test` 来执行两个命令。

启动 `hexo` 后，`hexo` 默认运行在 `http://0.0.0.0:4000`，然后再运行 `browser-sync` 监听源文件的变化，同时代理 `http://0.0.0.0:4000`，来实现页面的实时刷新。`browser-sync` 默认运行在 3000 端口。


## 2、 .nojekyll

`.nojekyll` 文件是一个用于 GitHub Pages 的特殊文件。当你在 GitHub 仓库的根目录中包含这个文件时，它会告诉 GitHub Pages 不要使用 Jekyll 来处理你的站点。
Jekyll 是一个静态站点生成器，GitHub Pages 默认使用它来将 Markdown 和其他文本格式的文件转换成静态 HTML 页面。

如果你的仓库包含的已经是静态 HTML 文件，或者你使用了其他构建流程（例如 Gulp、Webpack 或 VuePress 等），并且不想让 GitHub Pages 自动使用 Jekyll 处理这些文件，那么添加一个空的 `.nojekyll` 文件就可以避免这种情况。
这个文件不需要任何内容，只需存在即可生效。这样，GitHub Pages 就会直接将你的仓库内容作为静态网站发布，不做任何额外的 Jekyll 处理步骤。

## 3、github 的 branches 中 stale 是什么意思

在 GitHub 中，"stale" 是指一个分支在一段时间内没有任何活动或更新，可能意味着该功能或修复已经不再使用。

## 4、git branch -a 看到的远程分支，代码在本地吗

在 Git 中，当你使用 `git branch -a` 命令查看所有的分支（包括远程分支和本地分支）时，你会看到所有分支的列表。这里的“远程分支”指的是那些在远程仓库中的分支，而非你本地仓库中的分支。

【理解远程分支和本地分支】

本地分支：这些是你在本地工作区中创建的分支，它们存在于你的本地仓库中。你可以通过 git branch 命令查看所有本地分支。

远程分支：这些是存在于远程仓库（比如 GitHub、GitLab 或 Bitbucket 等）中的分支。远程分支以 origin/分支名 的形式存在（这里的 origin 是远程仓库的默认名称，可以通过 git remote -v 查看），而不是直接在本地工作区中。你可以通过 git branch -r 查看所有远程分支。

【如何获取远程分支到本地】

如果你想将远程分支检出到本地，以便你可以开始在这些分支上工作，你可以使用以下命令：

1.查看远程分支：

```bash
git branch -r
```


2.检出远程分支到本地：
如果你想创建一个本地的跟踪分支（即一个本地分支，它会跟踪远程分支的更新），可以使用：

```bash
git checkout -b 本地分支名 origin/远程分支名
```


例如，如果你想创建一个名为 feature-x 的本地分支来跟踪远程的 origin/feature-x 分支，你可以使用：

```bash
git checkout -b feature-x origin/feature-x
```

3.只获取远程分支的最新信息（不创建本地跟踪分支）：
如果你只是想获取远程分支的最新信息而不立即切换到那个分支，可以使用：

```bash
git fetch origin 远程分支名:本地引用名
```


例如，要获取 origin/feature-x 并创建一个本地的引用而不切换到它，可以使用：

```bash
git fetch origin feature-x:refs/remotes/origin/feature-x
```

【总结】
- 远程分支不会直接在你的本地工作区中显示，需要通过 git branch -r 查看。
- 要在本地工作，你需要创建一个跟踪的本地分支或者获取远程分支的信息。
- 使用 git checkout -b 可以创建一个新的本地分支并开始跟踪一个远程分支。
- 使用 git fetch 可以获取远程分支的最新状态而不立即切换到那个分支。

## 5、在GitHub网页上删除了远程仓库（remote）的一些分支，但是本地仓库（local）仍然保留着对这些分支的跟踪信息（tracking branches）和本地分支（如果存在对应的本地分支）。

要同步本地仓库的分支状态，我们可以执行以下步骤：

1、首先，我们可以使用 git remote prune 命令来清理本地仓库中那些在远程仓库已经不存在的分支的跟踪分支（即远程分支的本地引用）。
通常，我们使用以下命令来清理名为 origin 的远程（默认远程名称）的过时分支引用：

```bash
git fetch origin --prune

# 或者简写为：
git fetch origin -p
```

这个命令会更新远程分支的本地引用，并删除那些在远程已经不存在了的分支的本地引用。

2、但是，请注意：上面的命令只会删除远程跟踪分支（即 `refs/remotes/origin/<branch>` 这样的引用），并不会删除本地分支（即使这些本地分支对应的远程分支已经被删除）。
如果你在本地也有一些已经合并过并且不再需要的分支（包括那些你曾经创建的、对应于远程分支的本地分支），你可以手动删除它们。

3、要删除本地的分支，可以使用：
```bash
git branch -d <branch-name>

# 如果分支还没有被合并，但是你想强制删除，可以使用 -D 选项（大写）：

git branch -D <branch-name>
```

4、另外，我们可以通过以下命令查看本地仓库中哪些分支的远程分支已经被删除（即上游分支不存在）：
```bash
git branch -vv
```
在输出中，如果看到某个分支前面有 [gone] 标记，说明该分支的远程分支已经被删除。
例如：
```bash
feature/old  1234567 [origin/feature/old: gone] Some commit message
```
对于这样的分支，我们可以手动删除本地分支。




