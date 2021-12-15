<template>
    <view :class="[`base_switch_container ${param.inputBlock ? 'van_field_input_block' : ''}`]">
        <van-field
          name="switch"
          :label="param.label"
          :readonly="param.readonly"
          :disabled="param.disabled"
          :style="param.style"
          label-class="van_field_label"
        >
          <template slot="input" style="transform: translateY(6rpx);">
            <van-switch
              size="20"
              :disabled="param.readonly||param.disabled"
							v-model="param.value"
              @change="handleChange"
            />
          </template>
        </van-field>
    </view>
</template>

<script>
    export default {
        props: {
            param: {
                type: Object,
                default: function() {
                    return { 
                        inputBlock: true,
                        checked: false,
                        required: false,
                        readonly: false,
                        error: false,
                        "error-message": "",
                        style: ""
                    }
                }
            }
        },
        methods: {
            handleChange (e) {
               this.$emit("change", e)
            }
        }
    }
</script>

<style lang="less" >
    @import "./common.less";
    .base_switch_container {
        
    }
</style>
