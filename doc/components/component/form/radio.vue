<template>
  <div class="doc">
    <h2>Radio 单选框</h2>

    <h3>基本调用</h3>
    <example demo="form/radio2"></example>

    <h3>组件式调用</h3>
    <p>推荐使用数据模式的radio选择器，使用js实现整个交互，兼容性更高。使用 <code>v-model</code> 以及 <code>datas</code>参数完成整体的调用。</p>
    <p>对于对象数组的解析，系统默认使用<code>key</code>, <code>title</code>两个参数进行识别。可以通过全局配置修改两个参数名称，详情请参考<router-link to="/guide/config">全局配置</router-link></p>
    <example demo="form/radio1"></example>

    <h3>自定义key, title</h3>
    <example demo="form/radio3"></example>

    <h3>组件式数据字典调用</h3>
    <p>Hey UI将提供数据字典的调用方式模型，并内置<code>dictMapping</code>方法做展示。详情请至<router-link to="/guide/config">全局配置</router-link>。</p>
    <example demo="form/radio4"></example>

    <h3>Radio 参数</h3>
    <table class="table">
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>datas</td>
        <td>数据字典</td>
        <td>Array,Object</td>
        <td>-</td>
        <td>-</td>
      </tr>
      <tr>
        <td>dict</td>
        <td>调用配置好的字典库，详情请至<router-link to="/guide/config">全局配置</router-link></td>
        <td>String</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>是否禁用</td>
        <td>Boolean</td>
        <td>-</td>
        <td>false</td>
      </tr>
      <tr>
        <td>value</td>
        <td>单个选择模式</td>
        <td></td>
        <td>-</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>