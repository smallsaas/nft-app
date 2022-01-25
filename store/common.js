import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const commonStore = new Vuex.Store({
	state: {
		redDotData: {}, // 存储我的精灵tab是否展示红点
	},
	getters: {},
	mutations: {
		updateState: (state, payload = {}) => {
			for (const i in payload) {
				state[i] = payload[i]
			}
		},
		clear: (state) => {

		},
		setUserData(state, payload) {
			this.userData = payload
		}
	}
})

export default commonStore
