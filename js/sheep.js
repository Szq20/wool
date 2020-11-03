 var sheep = {
/**
 * 局部函數在外运行     
 */
    spars: {
    speed:7,
    stage:document.getElementsByClassName('stage')[0],
    frequency:70,
    backX:0,
    maxsheep:10
    },

   init: function() {
    this.creatSheep(); //创建羊  this指向对象sheep
    },


    creatSheep: function() {
        function SheepClass(data){
          //羊的类  构造函数
          this.sheep = document.createElement("div"); //创建一只羊
          this.sheep.className = "sheep";
          this.frequency = Math.floor(Math.random() * data.frequency) + 30; //30~100
          this.speed = data.speed;
          this.backX = data.backX;
          this.stage = data.stage;
          this.top = 0;
          this.currSpeed = data.speed;
          this.maxsheep = data.maxsheep;
          data.stage.appendChild(this.sheep); //放到舞台上
        //   console.log(data.stage);
        }
    
        var oneSheep = new SheepClass(this.spars); //创建一只羊 实例
        // 动画开启
        this.sheepRunning(oneSheep);
        _this = this;
        var T = setInterval(function(){
            var len = _this.spars.stage.children.length;
            // console.log(_this.spars.stage.children.length);
            if (len < _this.spars.maxsheep) {
                var onesheeps = new SheepClass(_this.spars);
                _this.sheepRunning(onesheeps);
            }
        },1000)

    },

    sheepRunning: function(obj){

       obj.sheepAnimate = setInterval(function () {
        /**
         *  自身动画
         */
        obj.backX = obj.backX + obj.sheep.offsetWidth;
        if (obj.backX >= 1312) {
          obj.backX = 0;
        }
        obj.sheep.style.backgroundPosition =-obj.backX + "px " + obj.top + "px"; //羊自身动画
            
            var cot = obj.sheep.offsetLeft - obj.speed;
            if (cot <= -obj.sheep.offsetWidth) {
              clearInterval(obj.sheepAnimate);
            //   console.log("remove");
              obj.stage.removeChild(obj.sheep);
            }
            obj.sheep.style.left = cot + "px"; //羊在舞台移动动画
            
        },obj.frequency)

        obj.sheep.onmousedown =function(e){
            obj.speed = 0;
            obj.top = -122;
            var X = e.pageX - obj.sheep.offsetLeft;
            var Y = e.pageY - obj.sheep.offsetTop;
            console.log(obj.sheep.offsetTop)
            document.onmousemove =function(e){
                obj.sheep.style.left = e.pageX - X + 'px';
                obj.sheep.style.top = e.pageY - Y + 'px'; 
            };
            document.onmouseup = function(){
                obj.speed = 7;
                obj.top = 0;
                document.onmousemove = null;
            }
        }








    }

 }
    sheep.init();
