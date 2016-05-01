angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, $timeout, azureBlob) {

        var client = null;
        var todo = $scope.todo = { text: '', desc: '', complete: false, containerName: 'con', resourceName: '' };

        var getClient = function() {
            if (client == null) {

                client = new WindowsAzure.MobileServiceClient('<Azure mobile sevice Name>',
                    '<Azure mobile service key>');//.withFilter(loggingFilter);
            }
            return client;
        };

        $scope.uploadfile = {};

        $scope.selectFile = function() {
            ionic.trigger('click', { target: document.getElementById('file') });
        };

        angular.element('#file').on('change', function(event) {
            console.log('fire! angular#element change event');

            var file = event.target.files[0];
            $scope.uploadfile.src = file;
            $scope.$apply();
        });

        var win = function(data, status, headers, config) {
            console.log("sucess");
            alert('file uploaded');
        };

        var fail = function(data, status, headers, config) {
            console.log("fail");
            alert('file upload error');
        };

        var prog = function(percentComplete, data, status, headers, config) {
            $timeout(function() {
                $scope.progress = percentComplete;
            });
        };

        $scope.upload = function() {
            var file = $scope.uploadfile.src;
            if (!file) {
                alert('select file');
                return;
            }

            var filename = file.name;
            // todo: add text and description
            todo.resourceName = filename;
            todo.desc = filename + " desc";
            todo.text = filename + " text";

            var client = getClient();
            todoItemTable = client.getTable('todoItem2');

            todoItemTable.insert(todo)
                .then(function(item) {
                    alert(JSON.stringify(item));
                    if (item.sasQueryString !== undefined) {
                        console.debug("Query string: " + item.sasQueryString);
                        console.log('insert successful');
                        var config = {
                            baseUrl: item.imageUri,// baseUrl for blob file uri (i.e. http://<accountName>.blob.core.windows.net/<container>/<blobname>),
                            sasToken: item.sasQueryString, // Shared access signature querystring key/value prefixed with ?,
                            file: file, // File object using the HTML5 File API,
                            progress: prog, // progress callback function,
                            complete: win, // complete callback function,
                            error: fail,// error callback function,
                            //blockSize: (1024 * 64 * 4)// Use this to override the DefaultBlockSize,
                            blockSize: (1024 * 1000)// Use this to override the DefaultBlockSize,
                        };
                        console.log('azureBlob.upload');
                        azureBlob.upload(config);
                    }
                }, function(error) {
                    alert(JSON.parse(error.request.responseText).error);
                });
        };

        $scope.cancel = function() {
        };

    });
