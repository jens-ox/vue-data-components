# Group

There is only one component here &ndash; `group`.

## Group

**Type**: Basic

**Wraps**: [g](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g)

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