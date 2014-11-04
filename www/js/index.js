//Camera Section
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {}

// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {    
    uploadFile(mediaFiles[0]);
}

// Called if something bad happens.
//
function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureImage() {
    // Launch device camera application,
    // allowing user to capture only one image by {limit: 1}
    navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 1 });
}

// Upload files to server
function uploadFile(mediaFile) {
    path = mediaFile.fullPath;
    name = mediaFile.name;
    
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=mediaFile.name;
    options.mimeType="image/jpeg";

    var params = new Object();
    params.fullpath = path;
    params.name = name;

    options.params = params;
    options.chunkedMode = false;
    
    var ft = new FileTransfer();
    ft.upload( path, "http://www.serverurl.com/image_upload",
        function(result) {
            //upload successful            
        },
        function(error) {
            //upload unsuccessful, error occured while upload. 
        },
        options
        );
}