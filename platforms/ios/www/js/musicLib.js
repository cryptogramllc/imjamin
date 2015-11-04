

        var iTunesMusicLibrary = {
            showMusicPicker: function(types, success, fail) {
                console.log("Working");
                return Cordova.exec(success, fail, "jp.co.asial.iTunesMusicLibrary", "showMusicPicker", types);
            }
        };

        var playMusic = function(musicUrl){
            var $_player = $('#player');
            $_player
            .attr({
                'src': musicUrl    
            });
            $_player.get(0).load();
            $_player.get(0).play();
        };

        var addMusicItem = function(data){
            var $_list = $('#files-list');

            // artworkの有無を確認
            var $_appendedImg;
            if (data.hasOwnProperty('artworkUrl')) {
                $_appendedImg = $('<img>')
                .attr({
                    'src': data.artworkUrl,
                    'class': 'artwork'
                })
                .bind('touchend', function(){
                    playMusic(data.musicUrl);      
                });
            } else {
                $_appendedImg = $('<div>')
                .attr({
                    'class': 'artwork'
                })
                .text('No image')
                .bind('touchend', function(){
                    playMusic(data.musicUrl);      
                });
            }

            $_list.append(
                $('<li>')
                .append($_appendedImg)
                .append(
                    $('<a>')
                    .attr({
                        'href': 'javascript:(function(){return undefined;}())',
                        })
                    .text(data.title)
                    .click(function(){playMusic(data.musicUrl)})
                )
            )
        }

        var MusicManager = function(){
            if (!MusicManager.instance) {
                var musicList = localStorage.getItem(MusicManager.key);
                musicList = musicList ? eval('(' + musicList  + ')') : [];

                this.setMusic = function(data, callback) {
                    data.id = new Date().getTime();
                    musicList.push(data);

                    localStorage.setItem(MusicManager.key, JSON.stringify(musicList));

                    // callbackがある場合は実行
                    if (callback && typeof callback === 'function') {
                        callback(data);
                    }
                };

                this.getMusic = function(musicId) {
                    if (musicId) {
                        var ret;
                        musicList.forEach(function(item, index, arr){
                                if (!ret && item.id == musicId) {
                                ret = item;
                                }     
                                });

                    } else {
                        ret = musicList;
                    }

                    return ret;
                }

                MusicManager.instance = this;
            }

            return MusicManager.instance;
        };

        MusicManager.getInstance = function(){
            if (!this.instance) {
                this.instance = new MusicManager();
            }

            return this.instance;
        }

        MusicManager.key = "MUSIC_LIST";

        $('body').on('touchstart', 'a.update-music-lib', function(){
            console.log("clicked");
            iTunesMusicLibrary.showMusicPicker([], function(data){
                MusicManager.getInstance().setMusic(data, addMusicItem);
            }, function(error){
                alert(error.message);
            });
        });


        MusicManager.getInstance().getMusic().forEach(function(item, index, arr){
            addMusicItem(item);     
        });