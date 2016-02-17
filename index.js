window.onload=function(){
      //audio对象的属性和方法事件
      var audio=document.querySelector("audio");
      var playerbar=document.querySelector(".player_bar");
       var yinyueku=[
        {name:"Capo Productions",src:"Capo Productions-Journey.mp3",singer:"Journey",duration:"02:57"},
        {name:"不可说",src:"不可说.mp3",singer:"霍建华",duration:"03:42"},
        {name:"Richard Clayderman-星空(吉他 独奏 钢琴曲)",src:"Richard Clayderman-星空(吉他 独奏 钢琴曲).mp3",singer:"Janna",duration:"05:52"},
        {name:"钢琴-钢琴曲(明月千里寄相思)",src:"钢琴-钢琴曲(明月千里寄相思).mp3",singer:"Simisex",duration:"02:17"},
        {name:"天使在人间",src:"羽·泉-天使在人间.mp3",singer:"羽泉",duration:"03:36"},
        {name:"Spring",src:"张一益-Spring.mp3",singer:"张一益",duration:"03:02"}
      ]
         var currentsongindex;//记录歌曲下标
         var LIEBIAO=3,SHUNXU=2,DANQU=1,SUIJI=4;
         var currentbofangmoshi=LIEBIAO;
         var createlist=function(){
          var listall="";
          for(var i=0;i<yinyueku.length;i++){
            var ac=(i==currentsongindex)?'play_current':'';
                 listall+='<li mid="j0" class="'+ac+'"><strong class="music_name">'+yinyueku[i].name+'</strong><strong class="singer_name">'+yinyueku[i].singer+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_004G32aO02kchg" mid="004G32aO02kchg"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';   
             }

         divsonglist.firstElementChild.innerHTML=listall;
         spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>';
        var list=divsonglist.firstElementChild.children;
            for(var i=0;i<list.length;i++){
                list[i].index=i;
                list[i].onclick=function(){
          audio.src=yinyueku[this.index].src;
          audio.play();
          currentsongindex=this.index;
          onsongchange();
        }
               list[i].onmouseover=function(){
               this.classList.add("play_hover");
        }
               list[i].onmouseout=function(){
               this.classList.remove("play_hover");
        }
       }
       //单个歌曲删除
          var del=document.querySelectorAll(".btn_del");
          for(var i=0;i<list.length;i++){
            del[i].index=i;
            del[i].onclick=function(e){
              e.stopPropagation();//阻止冒泡
              var that=this;
              var newarr=[];
              for(var i=0;i<yinyueku.length;i++){
                if(yinyueku[that.index]!=yinyueku[i]){
                  newarr.push(yinyueku[i])
                }
              }
              yinyueku=newarr;
              
          if(this.index<currentsongindex){
            currentsongindex-=1;
          }//利用ac 或者调用onsongchange
            
             if(this.index===currentsongindex){
                if(currentsongindex===yinyueku.length-1){
                  audio.src="";
                  uireset();
                }else if(this.index!=currentsongindex){
                  audio.src=yinyueku[currentsongindex].src;
                  audio.play();
                  onsongchange();
                }
              }
               createlist();
            }
          }


     }
       createlist();
//上一曲。下一曲。
           var nextsong=function(){
           if(currentsongindex==undefined){return;}
           if(currentbofangmoshi==SUIJI){
            randomsong();
            return;
           }
           currentsongindex+=1;
           currentsongindex=currentsongindex==yinyueku.length?0:currentsongindex;
           audio.src=yinyueku[currentsongindex].src;
           audio.play();
           onsongchange();
        }
        document.querySelector(".next_bt").onclick=nextsong;
        
           var presong=function(){
           if(currentsongindex==undefined){return;}
           if(currentbofangmoshi==SUIJI){
            randomsong();
            return;
           }
           currentsongindex-=1;
           currentsongindex=(currentsongindex==-1)?(yinyueku.length-1):currentsongindex;
           audio.src=yinyueku[currentsongindex].src;
           audio.play();
           onsongchange();
        }
        document.querySelector(".prev_bt").onclick=presong;
  //歌曲变化时候 UI和内容更新     
       var onsongchange=function(){
             var list=divsonglist.firstElementChild.children;
              for(var i=0;i<list.length;i++){
                list[i].classList.remove("play_current");
              }
                list[currentsongindex].classList.add("play_current");
                document.querySelector(".music_name").innerHTML=yinyueku[currentsongindex].name;
                document.querySelector(".singer_name").innerHTML=yinyueku[currentsongindex].singer;
                document.querySelector(".play_date").innerHTML=yinyueku[currentsongindex].duration;
                document.querySelector(".music_op").style.display="block";
       }

        
//播放模式功能
     btnPlayway.onclick=function(){
            divselect.style.display="block";
     }
    
      setbofangmoshi=function(num){
        currentbofangmoshi=num;
         divselect.style.display="none";
        var data={
          1:"cycle_single_bt",//单曲
          2:"ordered_bt",     //顺序
          3:"cycle_bt",       //列表
          4:"unordered_bt",   //随机

        }
        btnPlayway.className=data[num];
      }

       
      //可以直接使用id名。
      //播放暂停功能
       btnplay.onclick=function(){
       	if(audio.paused){
          audio.play();
       	}else{
       		audio.pause();
       	}
      	
      }
      //播放暂停状态下按钮样式
      audio.onplay=function(){
      	btnplay.classList.add("pause_bt");
        btnplay.classList.remove("play_bt");
      }
       audio.onpause=function(){
        btnplay.className="play_bt";
      }
      //音量控制功能
      spanvolume.onclick=function(e){
      	var v=e.offsetX/this.offsetWidth;
      	audio.volume=v;
      }
        audio.onvolumechange=function(){
      	var r=audio.volume*100+"%";
      	spanvolumeop.style.left=r;
        spanvolumebar.style.width=r;
      	if(audio.volume===0){
      		spanmute.className="volume_mute";
      	}else{
      		spanmute.className="volume_icon";
      	}
      }
      spanvolumeop.onclick=function(e){
      	e.stopPropagation();
      }//阻止事件流


       //静音功能
        spanmute.onclick=(function(){
      	var oldvolume;
      	return function(){
        if(audio.volume){
        	oldvolume=audio.volume;
        	audio.volume=0;
          this.className="volume_mute";
        }else{
        	audio.volume=oldvolume||0;
          this.className="volume_icon";
        }
      }
      })();

      


     audio.ontimeupdate=function(){
         spanplaybar.style.width=this.currentTime/this.duration*100+"%";
         spanprogress_op.style.left=this.currentTime/this.duration*100+"%"

         if(audio.ended){
          if(currentbofangmoshi==DANQU){
            audio.play();
          }else if(currentbofangmoshi==LIEBIAO){
              nextsong();
         }else if(currentbofangmoshi==SUIJI){
            randomsong();
          }else if(currentbofangmoshi==SHUNXU){
            if(currentsongindex!=yinyueku.length-1){
              nextsong();
            }
          }
      }
    }
      //进度功能
      var randomsong=function(){
            currentsongindex=Math.floor(Math.random()*yinyueku.length);
            audio.src=yinyueku[currentsongindex].src;
            audio.play();
            onsongchange();
         }
     document.querySelector(".player_bar").onclick=function(e){
           spanplaybar.style.width=e.offsetX/this.offsetWidth*100+"%";
           spanprogress_op.style.left=e.offsetX/this.offsetWidth*100+"%";
           audio.currentTime=audio.duration*(e.offsetX/this.offsetWidth);
     }

     spanprogress_op.onclick=spanprogress_op.onmouseover=spanprogress_op.onmouseout=function(e){
        e.stopPropagation();
     }
//清空列表
clear_list.onclick=function(){
  yinyueku=[];
  createlist();
  uireset();
}
      
    var uireset=function(){
       document.querySelector(".music_name").innerHTML='<span>听我想听的歌</span>';
       document.querySelector(".singer_name").innerHTML='<span>QQ音乐</span>';
       ptime.innerHTML="";
       document.querySelector(".music_op").style.display="none";
       audio.src="";
       spanprogress_op.style.left=0;
       spanplaybar.style.width=0;
       btnplay.className="play_bt";
    }
  

// 播放器隐藏显示功能
     spansongnum1.onclick=function(){
      if(divplayframe.style.display=="none"){
      divplayframe.style.display="block";
     }else{
      divplayframe.style.display="none";
     }
}



btnfold.onclick=function(){
  var flag=true;
  if(flag){
    divplayer.style.left=-540+"px";
    divplayer.classList.add("m_player_folded");
    flag=false;
  }else{
    divplayer.style.left=0;
    divplayer.classList.remove("m_player_folded");
    flag=true;
  }
}

   //时间设置
   var pb=document.querySelector(".player_bar");
   var ts=document.querySelector(".time_show");
   pb.onmouseover=function(e){
    ts.style.display="block";
    ts.style.left=e.offsetX-ts.offsetWidth/2+"px";
    var time=e.offsetX/this.offsetWidth*audio.duration;
    time_show.innerHTML=timer(time);
   } 
   pb.onmouseout=function(){
    ts.style.display="none";
   }
   pb.onmousemove=function(e){
    ts.style.left=e.offsetX-ts.offsetWidth/2+"px";
    var time=e.offsetX/this.offsetWidth*audio.duration;
    time_show.innerHTML=timer(time);
   }


  var timer=function(time){
        var m=parseInt(time/60);
        var s=parseInt(time%60);
        m=(m<10)?("0"+m):m;
        s=(s<10)?("0"+s):s;
        return m+":"+s;
      }



}