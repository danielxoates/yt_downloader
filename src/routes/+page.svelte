<script>
    import { Button, Dropdown, DropdownItem, Alert } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';

    let URL = '';
    let fileType = '';
    let showAlert = false;
    let error = '';
    let showSuccess = false;
    let showStart = false;

    function download() {
        if (URL === '') {
            showError('URL cannot be empty');
            return;
        }
        if (fileType === '') {
            showError('File type cannot be empty');
            return;
        }
        if (fileType == 'mp3') {
            Start();
            fetch('http://localhost:2222?url='+URL+'&type='+fileType, {
                method: 'GET',
            })
            .then((response) => {
                if (!response.ok) {
                    showError('Download failed. Please try again.');
                    throw new Error('Failed to download');
                }
                else {
                    Success();
                }
            })
            .catch((err) => {
                showError('Download failed. Please try again.');
                console.error(err);
            });
        }
        if (fileType == 'mp4') {
            Start();
            fetch('http://localhost:2222?url='+URL+'&type='+fileType, {
                method: 'GET',
            })
            .then((response) => {
                if (!response.ok) {
                    showError('Download failed. Please try again.');
                    throw new Error('Failed to download');
                }
                else {
                    Success();
                }
            })
            .catch((err) => {
                showError('Download failed. Please try again.');
                console.error(err);
            });
        }
    }

    /**
   * @param {string} message
   */
    function showError(message) {
        error = message;
        showAlert = true;
    }
    function Success() {
        showSuccess = true;
    }
    function Start() {
        showStart = true;
    }
    const closeAlert = () => {
        showAlert = false;
        showSuccess = false;
        showStart = false;
        error = ''; // Reset the error message when alert closes
    };
</script>
  
  <h1 class="text-3xl font-bold text-center mt-8">YouTube Downloader</h1>
  
  {#if showAlert}
    <div class="alert alert-red flex items-center justify-between p-4 border border-red-300 rounded-lg bg-red-100 text-red-800">
      <span class="font-medium">Error:</span> {error}
      <button on:click={closeAlert} class="text-red-800 hover:text-red-600 font-bold">X</button>
    </div>
  {/if}
  {#if showSuccess}
    <div class="alert alert-green flex items-center justify-between p-4 border border-green-300 rounded-lg bg-green-100 text-green-800">
      <span class="font-medium">Download success!</span>
      <button on:click={closeAlert} class="text-green-800 hover:text-green-600 font-bold">X</button>
    </div>
  {/if}
  {#if showStart}
    <div class="alert alert-green flex items-center justify-between p-4 border border-grey-300 rounded-lg bg-grey-100 text-grey-800">
        <span class="font-medium">Download started!</span>
        <button on:click={closeAlert} class="text-grey-800 hover:text-grey-600 font-bold">X</button>
    </div>
   {/if}
  
  <div class="max-w-md mx-auto mt-6 space-y-4">
    <input 
      bind:value={URL} 
      placeholder="Enter a URL" 
      class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  
    <div class="relative">
      <Button class="bg-blue-500 flex items-center justify-between w-full text-white p-3 rounded-lg hover:bg-blue-600">
        <p>{fileType || 'Select File Type'}</p>
        <ChevronDownOutline class="w-6 h-6 ms-2" />
      </Button>
      <Dropdown class="rounded border border-gray-500">
        <DropdownItem on:click={() => fileType = 'mp3'} class="p-3 hover:bg-gray-100">MP3</DropdownItem>
        <DropdownItem on:click={() => fileType = 'mp4'} class="p-3 hover:bg-gray-100">MP4</DropdownItem>
      </Dropdown>
    </div>
  
    <Button on:click={download} class="w-full bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-600">
      Download
    </Button>
  </div>
  
  <p class="text-center mt-6 text-gray-500">URL: {URL || 'none'}, File Type: {fileType || 'none'}</p>
  <p class="text-center mt-6 text-gray-500">Due to YouTube's new ad blocking updates, the node backend responsible
    for downloading and saving the video will now have to be downloaded and hosted on your local machine.
  </p>
  <p class="text-center mt-6 text-gray-500">A link to instructions and the backend code can be found <a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://github.com/danielxoates/yt_downloader">here</a></p>

  <style>
    .alert {
      animation: fadeIn 0.3s ease-out;
    }
  
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
  