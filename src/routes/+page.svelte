<script>
    
    import { Button, Dropdown, DropdownItem, Alert } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    let URL = $state('');
    let fileType = $state('');
    let showAlert = $state(false);
    let error = $state('');
    function download(){
        if (URL == ''){
            showAlert = true;
            error = 'URL cannot be empty'
            return
        }
        if (fileType == ''){
            showAlert = true;
            error = 'File type cannot be empty'
            return
        }
    };
    const closeAlert = () => {
    showAlert = false;
    };
</script>

<h1 class="text-2xl font-bold">YouTube Downloader</h1>
{#if showAlert}
  <Alert color="red" on:close={closeAlert}>
    <span class="font-medium">Error:</span> {error}
    <button onclick={closeAlert} class="btn btn-danger ml-2">
        Close
    </button>
  </Alert>
{/if}
<div>
    <input bind:value={URL} placeholder="Enter a URL" class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <Button class="text-black">File Type<ChevronDownOutline class="w-6 h-6 ms-2 text-black" /></Button>
    <Dropdown>
        <DropdownItem onclick={() => fileType='MP3'}>MP3</DropdownItem>
        <DropdownItem onclick={() => fileType='MP4'}>MP4</DropdownItem>
    </Dropdown>
    <button onclick={download} >Download</button>
</div>

<p>URL: {URL || 'none'}, file type: {fileType || 'none'}</p>