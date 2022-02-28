

export default (value) => {
	  let nowDate
	  if(value){
		  nowDate = new Date(value)
	  }else{
		  nowDate = new Date()
	  }
	  let date = {
	    year: nowDate.getFullYear(),
	    month: (nowDate.getMonth() + 1) < 10 ? `0${nowDate.getMonth() + 1}`: nowDate.getMonth() + 1,
	    date: nowDate.getDate() < 10 ? `0${nowDate.getDate()}`: nowDate.getDate()
	  }
	  return date.year + '-' + date.month + '-' + date.date
}