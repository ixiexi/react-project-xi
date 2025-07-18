# xi-hooks
## 能力支持
### 1. 可靠的代码
使用TS构建，提供类型定义文档

### 2. 完善的文档
提供完善的文档，包括API说明、代码示例等

### 3. 完善的测试
提供完善的测试用例，确保代码质量

## 设计目的
抽取业务中常用的hooks，提升开发效率，减少重复造轮子的时间成本

## 技术选型
### 包管理工具 -- pnpm

作为基础包，选择社区比较推荐的`pnpm workspace`解决方案，主要原因：
1. `pnpm`安装速度快，磁盘利用率高
2. 支持多包管理，每个包独立，互不干扰
3. 支持`workspace`，可以在一个项目中管理多个包

### 构建工具
- webpack

### 静态文件打包工具 --dumi
- dumi 为组件开发场景而生的文档工具

### 测试工具
- `jest` 测试框架
- `react-testing-library` 测试库
- 完善的测试用例，确保代码质量