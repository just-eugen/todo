<script>
    import { tasklist, _id, statusList } from './stores.js'

    export let showDialog = false
    export let editing = true

    export let id
    export let title
    export let description
    export let endDate
    export let status

    async function handleSubmit() {
        showDialog = false
        if (!editing) {
            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0')
            var mm = String(today.getMonth() + 1).padStart(2, '0')
            var yyyy = today.getFullYear()
            today = yyyy + '-' + mm + '-' + dd
            if (!status) status = 'todo'
            if (!$tasklist) $tasklist = []
            $tasklist.push({
                id: $_id,
                title, 
                description,
                createDate: today,
                endDate,
                status,
            })
            $_id++
            $tasklist = $tasklist
            localStorage.clear()
            localStorage.setItem("id", JSON.stringify($_id))
            localStorage.setItem("tasklist", JSON.stringify($tasklist))
            console.log($tasklist)
            return
        }

        const i = $tasklist.findIndex((task => task.id === id))
        $tasklist[i].title = title
        $tasklist[i].description = description
        $tasklist[i].status = status
        $tasklist[i].endDate = endDate
        $tasklist = $tasklist
        localStorage.clear()
        localStorage.setItem("tasklist", JSON.stringify($tasklist))
        localStorage.setItem("id", JSON.stringify($_id))
    }
</script>

<div class="bg">
    <form class="createTask" on:submit|preventDefault={handleSubmit}>
        {#if editing}
            <h3>Редактирование задачи</h3>
        {:else}
            <h3>Создание новой задачи</h3>
        {/if}
        
        <div>Наименование задачи</div>
        <input bind:value={title} type="text" required />
        
        <div>Описание</div>
        <textarea bind:value={description} />
        
        <div>Дата окончания</div>
        <input bind:value={endDate} type="date" required />

        Статус: 
        <select bind:value={status}>
        {#each $statusList as option}
            <option>{option}</option>
        {/each}
        </select>

        <div style="margin-top: 16px">
            <button type="submit">{editing ? 'Сохранить' : 'Создать'}</button>
            <button on:click={()=> showDialog = false}>Отмена</button>
        </div>
    </form>
</div>

<style>
    .bg {
        left: 0px;
        top: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .createTask button { 
        width: 100%;
        cursor: pointer;
    }
    .createTask button:hover { 
        background: #E6E6FA;
    }
    .createTask input {
        width: 100%;
    }
    .createTask textarea {
        width: 100%;
        height: 128px;
        overflow-y: scroll;
        resize: none;
    }
    .createTask {
        border-radius: 6px;
        position: relative;
        width: 60%;
        padding: 12px;
        margin: auto;
        top: 10%;
        background: #CCCCFF;
    }
</style>