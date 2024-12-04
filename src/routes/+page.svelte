<script>
    import { Button, Dropdown, DropdownItem, Alert } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';

    let URL = '';
    let fileType = '';
    let showAlert = false;
    let error = '';
    let showSuccess = false;

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
    const closeAlert = () => {
        showAlert = false;
        showSuccess = false;
        error = ''; // Reset the error message when alert closes
    };
</script>

<h1 class="text-2xl font-bold">YouTube Downloader</h1>

{#if showAlert}
  <Alert color="red" on:close={closeAlert}>
    <span class="font-medium">Error:</span> {error}
    <button on:click={closeAlert}>X</button>
  </Alert>
{/if}
{#if showSuccess}
  <Alert color="green" on:close={closeAlert}>
    <span class="font-medium">Download success</span>
    <button on:click={closeAlert}>X</button>
  </Alert>
{/if}

<div class="space-y-4">
    <input 
        bind:value={URL} 
        placeholder="Enter a URL" 
        class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
</div>
<div class="w-full">
    <Button class="bg-blue-500">
        <p class="text-black">{fileType || 'Select File Type'}</p>
        <ChevronDownOutline class="w-6 h-6 ms-2 text-black dark:text-white" />
    </Button>
    <Dropdown>
        <DropdownItem on:click={() => fileType = 'mp3'}>MP3</DropdownItem>
        <DropdownItem on:click={() => fileType = 'mp4'}>MP4</DropdownItem>
    </Dropdown>
</div>
<div>
    <Button on:click={download} class="w-full bg-blue-500 text-white">Download</Button>
</div>

<p>URL: {URL || 'none'}, File Type: {fileType || 'none'}</p>
