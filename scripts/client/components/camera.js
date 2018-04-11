MyGame.components.Camera = function(spec) {
    'use strict';

    function Rectangle(spec){
        'use strict';
        let that = {};
        let left = spec.left;
        let top = spec.top;
        let height = spec.height;
        let width = spec.width;
        let right = left + width;
        let bottom = top + height;
    
        that.set = function(newLeft, newTop, newWidth, newHeight){
            left = newLeft;
            top = newTop;
            width = newWidth || width;
            height = newHeight || height;
            right = left + width;
            bottom = top + height;
        }
    
        that.within = function(other){
            return (other.left <= left &&
            other.right >= right &&
            other.top <= top &&
            other.bottom >= bottom);
        }
    
        that.overlaps = function(other){
            return (left < other.right &&
            other.left < right &&
            top < other.bottom &&
            other.top < bottom);
        }
    
        return that;
    };

    let that = {};
    let xViewport = spec.xViewport;
    let yViewport = spec.yViewport;

    let xDeadZone = 0;
    let yDeadZone = 0;

    let viewPortWidth = spec.viewPortWidth;
    let viewPortHeight = spec.viewPortHeight;

    let worldWidth = spec.worldWidth;
    let worldHeight = spec.worldHeight;

    let followedPlayer = 0;

    let viewportRect = Rectangle({
        left: xViewport,
        top: yViewport,
        width: viewPortWidth,
        height: viewPortHeight
    });

    let worldRect = Rectangle({
        left: 0,
        top: 0,
        width: worldWidth,
        height: worldHeight
    });

    that.follow = function(playerObject, deadZoneX, deadZoneY){
        followedPlayer = playerObject;
        xDeadZone = deadZoneX;
        yDeadZone = deadZoneY;
    };

    that.update = function(){
        if(followed != null){
            if(followed.position.x - xViewport + xDeadZone > viewPortWidth){
                xViewport = followed.position.x - (viewPortWidth - xDeadZone);
            }
            else if(followed.position.x - xDeadZone < xViewport){
                xViewport = followed.position.x - xDeadZone;
            }

            if(followed.position.y - yViewport + yDeadZone > viewPortHeight){
                yViewport = followed.position.y - (viewPortHeight - yDeadZone);
            }
            else if(followed.position.y - yDeadZone < yViewport){
                yViewport = this.followed.y - yDeadZone;
            }
        }

        viewportRect.set(xViewport, yViewport);

        if(!viewportRect.within(worldRect)){
            if(viewportRect.left < worldRect.left){
                xViewport = worldRect.left;
            }
            if(viewportRect.top < worldRect.top){
                yViewport = worldRect.top;
            }
            if(viewportRect.right > worldRect.right){
                xViewport = worldRect.right - viewPortWidth;
            }
            if(viewportRect.bottom < worldRect.bottom){
                yViewport = worldRect.bottom - viewPortHeight;
            }
        }
    };

    return that;
}