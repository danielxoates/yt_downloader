<script>
    import { Button, Dropdown, DropdownItem, Alert } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';

    let URL = '';
    let fileType = '';
    let showAlert = false;
    let error = '';

    function download() {
        if (URL === '') {
            showError('URL cannot be empty');
            return;
        }
        if (fileType === '') {
            showError('File type cannot be empty');
            return;
        }
        
        fetch('http://localhost:2222', {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to download');
            }
            return response.json();
        })
        .then((json) => console.log(json))
        .catch((err) => {
            showError('Download failed. Please try again.');
            console.error(err);
        });
    }

    /**
   * @param {string} message
   */
    function showError(message) {
        error = message;
        showAlert = true;
    }

    const closeAlert = () => {
        showAlert = false;
        error = ''; // Reset the error message when alert closes
    };
</script>

<h1 class="text-2xl font-bold">YouTube Downloader</h1>

{#if showAlert}
  <Alert color="red" on:close={closeAlert}>
    <span class="font-medium">Error:</span> {error}
  </Alert>
{/if}

<div class="space-y-4">
    <input 
        bind:value={URL} 
        placeholder="Enter a URL" 
        class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <Dropdown>
        <Button class="w-full text-left">
            <span>{fileType || 'Select File Type'}</span>
            <ChevronDownOutline class="w-6 h-6 inline-block" />
        </Button>
        <DropdownItem on:click={() => fileType = 'MP3'}>MP3</DropdownItem>
        <DropdownItem on:click={() => fileType = 'MP4'}>MP4</DropdownItem>
    </Dropdown>

    <Button on:click={download} class="w-full bg-blue-500 text-white">Download</Button>
</div>

<p>URL: {URL || 'none'}, File Type: {fileType || 'none'}</p>
