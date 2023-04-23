export const truncateText=(string="", limit)=>{
    if(string.length <= limit){
        return string;
    }
    return string.slice(0, limit) + "..."
}

export const dateFormat = (date)=>{
    return new Date(date).getFullYear();
}

export const navScroll = ()=>{
    window.addEventListener('scroll', function(){
        var top = this.scrollY;
        if(top > 100){
            this.document.querySelector('nav')?.classList.add('scrolled');
        }else{
            this.document.querySelector('nav')?.classList.remove('scrolled');
        } 
    })
}


export const  numToTime=(num)=>{ 
    var hours = Math.floor(num / 60);  
    var minutes = num % 60;
    if (minutes + ''.length < 2) {
      minutes = '0' + minutes; 
    }
    return hours+'h ' + minutes+'m';
}