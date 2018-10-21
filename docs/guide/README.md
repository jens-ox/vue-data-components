---
sidebar: auto
---

# Introduction

Visualizations can be constructed by using the available components.

The following is an overview over the available components.

# Group

The `group` component is a wrapper around the `g` component of SVG.

**Props**

|Name|Type|Default|Description|
|:---|:---|:------|:----------|
|top|Number|0|Margin on the top.|
|left|Number|0|Margin on the left.|
|transform|String||If needed, a custom `transform` can be applied. If such a transform is specified, the `top` and `left` props are ignored (which are otherwise used to compute the transform).|

**Example**

```vue
<group :top="10" :left="20">
  <!-- content -->
</group>
```

## 