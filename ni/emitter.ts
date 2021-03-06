/****************** 导入 ******************/

/****************** 导出 ******************/
export default class Emitter {
	id = 1;
	/**
	 * @description 注册函数列表{key:[func1,func2,...]}
	 */
	list = {};
	/**
	 * @description 注册全局广播函数
	 * @param {string} key 函数注册的key,作为调用的唯一凭证
	 * @param {Function} func 注册接收消息的函数
	 */
	add(key, func){
		if(!this.list[key]){
			this.list[key] = [];
		}
		if(this.list[key].indexOf(func) >= 0){
			// return console.error("Has a same handler in the Emitter.list ",func);
			return;
		}
		func.id = this.id++;
		this.list[key].push(func);
		return func.id;
	}
	/**
	 * @description 删除监听
	 * @param key 监听类型
	 * @param opt 监听函数或监听id
	 */
	remove(key: string,opt:Function|number): void{
		let index;
		if(typeof opt == "function"){
			index = this.list[key].indexOf(opt);
		}else{
			for(let i = 0, len = this.list[key].length; i < len; i++){
				if(this.list[key][i].id == opt){
					index = i;
				}
			}
		}
		if(index >= 0){
			this.list[key].splice(index,1);
		}
	}
	/**
	 * @description 向所有注册为key的函数广播消息
	 * @param {string} key 注册函数的key
	 * @param {any} param 注册函数接收的参数
	 */
	emit(key,...param){
		let evs = this.list[key],r = [];
		if(!evs){
			// console.error(`There is no handler match '${key}'`);
			return r;
		}
		for(let i = 0, len = evs.length; i < len; i++){
			r.push(evs[i](...param));
		}
		return r;
	}

	static global: Emitter
}
/****************** 本地 ******************/

/****************** 立即执行 ******************/
/**
 * @description 注册全局事件触发器
 */
Emitter.global = new Emitter();