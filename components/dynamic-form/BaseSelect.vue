<template>
    <view :class="[`base_select_container ${param.inputBlock ? 'van_field_input_block' : ''}`]">
        <van-field
          readonly
          :required="param.required"
          :disabled="param.disabled"
          :style="param.style"
          :placeholder="param.placeholder"
          clickable
          name="picker"
          :label="param.label"
          :value="handleParseValue(param.value)"
          :error="param.error"
          :error-message="param['error-message'] || ''"
          label-class="van_field_label"
          @click-input="handleClick"
        >
        
        <!-- #ifdef APP-PLUS -->
            <template slot="input" style="width: 100%;">
                <view @click="handleClick">
                    <input
                        disabled
                        :placeholder="param.placeholder"
                        :placeholder-style="param['placeholder-style'] || 'color: #7D8187'"
                        :value="handleParseValue(param.value)"
                        :style="param.inputStyle || ''"
                    />
                </view>
            </template>
        <!-- #endif -->

        </van-field>
        <van-popup v-model="showPick" v-if="!param.readonly&&!param.disabled" position="bottom" @click-overlay="handlePickerCancel" custom-style="background-color: #fff;z-index: 999">
          <van-picker
            show-toolbar
            :columns="param.columns"
            value-key="label"
            @confirm="handlePickerConfirm"
            @cancel="handlePickerCancel"
          />
        </van-popup>
    </view>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: {
            param: {
                type: Object,
                default: function() {
                    return {
                        inputBlock: false,
                        required: false,
                        disabled: false,
                        error: false,
                        "error-message": "",
                        style: ""
                    }
                }
            }
        },
        data () {
          return {
              showPick: false
          } 
        },
        mounted() {
          this.handleInitData()
        },
        methods: {
            handleParseValue (value) {
              if (value) {
                  const list =  _.get(this.param, 'columns', [])
                  return _.get(list.find(x => x.value === value), 'label', '')
              }  
              return ''
            },
            handleInitData () {
                if (_.has(this.param, 'columns') && _.get(this.param, 'columns', []).length > 0) {
                    this.param.columns.map(x => {
                        if (!_.has(x, 'text')) {
                            x.text = _.get(x, 'label', '')
                        }
                    })
                }
            },
            handleClick () {
               this.showPick = true
            },
            handlePickerCancel () {
                this.showPick = false
            },
            handlePickerConfirm (e) {
							console.log(e)
                const value = _.get(e, 'value', '')
                this.$emit('confirm', value)
                this.showPick = false
            }
        }
    }
</script>

<style lang="less">
    @import "./common.less";
    .base_select_container {}
</style>
