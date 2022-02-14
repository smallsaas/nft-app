import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const commonStore = new Vuex.Store({
	state: {
		redDotData: {}, // 存儲我的精靈tab是否展示紅點
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
