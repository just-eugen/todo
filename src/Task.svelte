<script>
    import { tasklist } from './stores.js'

    export let id
    export let title
    export let description
    export let createDate
    export let endDate
    export let status
    export let editFunc

    let text;

    function removeTask() {
        $tasklist = $tasklist.filter(task => task.id != id)
        $tasklist = $tasklist

        localStorage.clear()
        localStorage.setItem("tasklist", JSON.stringify($tasklist))
    }

    async function preload() {
        const date1 = new Date(createDate)
        const date2 = new Date(endDate)
        const daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
		let url = 'http://numbersapi.com/'+ daysLag +'/trivia'
        let resp = await fetch(url)
        if (resp.ok) {
            text = await resp.text();
        }
        else {
            text = "error"
        } 
	}
</script>

{#await preload() then _}
<div class="task">
    <div class="title">
        {title}
    </div>
        
    {#if description}
    <div>
        {description}
    </div>
    {/if}

    <div>
        Дата создания: {createDate}
    </div>

    <div>
        Дата завершения: {endDate}
    </div>

    <div>{text}</div>

    <div>
        <snap class="btn" 
            on:click={()=>{
                editFunc({
                    id,
                    title,
                    description,
                    endDate,
                    status
                })
            }}
        >
            Редактировать
        </snap>
        <snap class="btn" on:click={removeTask}>Удалить</snap>
    </div>
</div>
{/await}

<style>
    .title {
        color: #ffffff;
        background: #6600FF; 
        text-align: center;
        overflow: hidden; 
        text-overflow: ellipsis;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .btn {
        color:#535353;
        text-decoration: underline;
    }
    .btn:hover {
        color:#6600FF;
        cursor: pointer;
    }
    .task {
        background: #CCCCFF;
        border: solid 1px #999999;
        margin-bottom: 12px;
        border-radius: 6px;
    }
    .task div {
        padding: 8px;
    }
</style>