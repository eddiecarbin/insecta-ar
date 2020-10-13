export class CameraViewRenderer {

    public video: HTMLVideoElement;

    public initialize(): void {

        this.video = document.getElementById('video') as HTMLVideoElement;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            var hint: any = {
                "audio": false,
                "video": true
            };
            // if (window.innerWidth < 800) {
            //     var width = (window.innerWidth < window.innerHeight) ? 240 : 360;
            //     var height = (window.innerWidth < window.innerHeight) ? 360 : 240;

            //     var aspectRatio = window.innerWidth / window.innerHeight;

            //     console.log(width, height);

            //     hint = {
            //         "audio": false,
            //         "video": {
            //             facingMode: 'environment',
            //             width: { min: width, max: width }
            //         },
            //     };

            //     console.log(hint);
            // }

            navigator.mediaDevices.getUserMedia(hint).then((stream) => {
                this.video.srcObject = stream;
                this.video.addEventListener('loadedmetadata', () => {
                    this.video.play();
                    // might have to add a promise call back;
                    console.log('video', this.video, this.video.videoWidth, this.video.videoHeight);



                    // start(
                    //     container,
                    //     markers['pinball'],
                    //     video,
                    //     video.videoWidth,
                    //     video.videoHeight,
                    //     canvas,
                    //     function () {
                    //         statsMain.update()
                    //     },
                    //     function () {
                    //         statsWorker.update();
                    //     },
                    //     null
                    // );
                });
            });
        }
    }
}