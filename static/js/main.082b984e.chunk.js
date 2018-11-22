(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(28)},22:function(e,t,n){},24:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(11),c=n.n(r),i=(n(22),n(1)),s=n(2),u=n(4),l=n(3),h=n(5),f=n(6),d=n(12),m=(n(24),function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).touchStartX=0,n.touchStartY=0,n.touchCurrX=0,n.touchCurrY=0,n.touchStart=function(e){var t=e.touches[0],a=t.clientX,o=t.clientY;n.touchStartX=a,n.touchStartY=o},n.touchMove=function(e){var t=e.touches[0],a=t.clientX,o=t.clientY;n.touchCurrX=a,n.touchCurrY=o},n.touchEnd=function(e){var t=n.touchCurrX-n.touchStartX,a=n.touchCurrY-n.touchStartY,o="none";o=Math.abs(t)>Math.abs(a)?t<0?"left":"right":a<0?"up":"down",n.props.swipe(o)},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:this.props.className,onTouchStart:this.touchStart,onTouchMove:this.touchMove,onTouchEnd:this.touchEnd},this.props.children)}}]),t}(a.Component)),v=36,g=64,p=function(e){var t=e.score;return o.a.createElement("div",{className:"heading"},o.a.createElement("p",null,"Score: ",t))},k=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).state={snake:[{x:Math.floor(Math.random()*v),y:Math.floor(Math.random()*g)}],direction:"up",food:{x:Math.floor(Math.random()*v),y:Math.floor(Math.random()*g)},score:0,gameState:"running"},n.timer=null,n.swipe=function(e){switch(e){case"up":"down"!==n.state.direction&&n.setState({direction:e});break;case"down":"up"!==n.state.direction&&n.setState({direction:e});break;case"left":"right"!==n.state.direction&&n.setState({direction:e});break;case"right":"left"!==n.state.direction&&n.setState({direction:e})}},n.isSnake=function(e,t){return n.state.snake.find(function(n){return n.x===e&&n.y===t})},n.getBlockColor=function(e,t){return n.isSnake(e,t)?" snake":e===n.state.food.x&&t===n.state.food.y?" food":""},n.returnToStart=function(){n.props.gameover(n.state.score)},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timer=setInterval(function(){var t=Object(d.a)({},e.state),n=Object.assign({},e.state.snake[0]);switch(e.state.direction){case"up":n.y=(n.y-1+g)%g;break;case"right":n.x=(n.x+1)%v;break;case"down":n.y=(n.y+1)%g;break;case"left":n.x=(n.x-1+v)%v}if(e.isSnake(n.x,n.y))return clearInterval(e.timer),void e.setState({gameState:"gameover"});var a=!1;if(n.x===t.food.x&&n.y===t.food.y?(a=!0,t.snake=[n].concat(Object(f.a)(t.snake))):t.snake=[n].concat(Object(f.a)(t.snake.slice(0,t.snake.length-1))),a){do{t.food.x=Math.floor(Math.random()*v),t.food.y=Math.floor(Math.random()*g)}while(e.isSnake(t.food.x,t.food.y));t.score++}e.setState(t)},this.props.interval)}},{key:"render",value:function(){var e=this,t=Array(g).fill(Array(v).fill(0));return o.a.createElement(m,{className:"Game",swipe:this.swipe},o.a.createElement(p,{score:this.state.score}),t.map(function(t,n){return o.a.createElement("div",{className:"row"},t.map(function(t,a){return o.a.createElement("div",{className:"block"+e.getBlockColor(a,n)})}))}),this.props.debug&&o.a.createElement("pre",null,JSON.stringify(this.state,null,2)),"gameover"===this.state.gameState&&o.a.createElement("h1",{className:"overlay",onClick:this.returnToStart},"Game over"))}}]),t}(a.Component),w=(n(26),function(e){var t=e.startGame,n=e.highScore;return o.a.createElement("div",{className:"StartScreen"},o.a.createElement("h1",null,"Snakes on a Phone"),o.a.createElement("p",null,"High Score: ",n),o.a.createElement("button",{onClick:t},"Start"))}),S=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).state={screen:"start",highscore:0},n.startGame=function(){return n.setState({screen:"game"})},n.gameOver=function(e){var t=Math.max(e,n.state.highscore);n.setState({screen:"start",highscore:t}),localStorage.setItem("highscore",t)},n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setState({highscore:localStorage.getItem("highscore")||0})}},{key:"render",value:function(){switch(this.state.screen){default:case"start":return o.a.createElement(w,{startGame:this.startGame,highScore:this.state.highscore});case"game":return o.a.createElement(k,{interval:100,debug:!1,gameover:this.gameOver})}}}]),t}(a.Component),b=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function y(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(o.a.createElement(S,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/snakes-on-a-phone",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/snakes-on-a-phone","/service-worker.js");b?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):y(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):y(e)})}}(),document.ontouchmove=function(e){e.preventDefault()}}},[[13,2,1]]]);
//# sourceMappingURL=main.082b984e.chunk.js.map