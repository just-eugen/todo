<script>
	import Task from './Task.svelte'
	import TaskDialog from './TaskDialog.svelte'
	import { tasklist, _id } from './stores.js'

	let showTaskDialog = false 
	let editing = false

	$: tasks = $tasklist && $tasklist.filter(task => 
				!findText || findText &&
				(task.title.toLowerCase().search(findText.toLowerCase()) != -1 || 
				task.description.toLowerCase().search(findText.toLowerCase()) != -1))
	let findText = ''

	let selectedTask = {
		id: '',
		title: '',
		description: '',
		endDate: '',
		status: '',
	}

	function createTask() {
		selectedTask.id = ''
		selectedTask.title = ''
		selectedTask.description = ''
		selectedTask.endDate = ''
		selectedTask.status = ''
		editing = false
		showTaskDialog = true
	}

	function handleEdit(data) {
		selectedTask.id = data.id	
		selectedTask.title = data.title
		selectedTask.description = data.description
		selectedTask.endDate = data.endDate
		selectedTask.status = data.status
		editing = true
		showTaskDialog = true
	}

	function loadTasks() {
		$tasklist = JSON.parse(localStorage.getItem("tasklist"))
		$_id = JSON.parse(localStorage.getItem("id"))
		console.log($tasklist, $_id)
	}
</script>

{#if showTaskDialog}
	<TaskDialog bind:showDialog={showTaskDialog} bind:editing={editing} {...selectedTask} />
{/if}

<main>
	<button on:click={createTask}>Создать задачу</button>
	<input bind:value={findText} type="search" placeholder="Поиск по названию или описанию задачи" style="width:50%"/>
	<!-- <div on:click={() => localStorage.clear()}>Удалить все</div> -->
	{#await loadTasks() then _}
	<div style="display: flex; margin-left: auto; margin-right: auto;">
		<div class="tasksContainer">
			<h3>TODO</h3>
			{#if tasks}
			{#each tasks.filter(task => task.status === 'todo') as task}
				<Task 
					on:click={()=>console.log(task)}
					id={task.id}
					title={task.title} 
					description={task.description}
					createDate={task.createDate}
					endDate={task.endDate}
					status={task.status}
					editFunc={handleEdit}
				/>
			{/each}
			{/if}
		</div>
		<div class="tasksContainer">
			<h3>IN PROGRESS</h3>
			{#if tasks}
			{#each tasks.filter(task => task.status === 'inProgress') as task}
				<Task 
					id={task.id}
					title={task.title} 
					description={task.description}
					createDate={task.createDate}
					endDate={task.endDate}
					status={task.status}
					editFunc={handleEdit}
				/>
			{/each}
			{/if}
		</div>
		<div class="tasksContainer">
			<h3>FINISHED</h3>
			{#if tasks}
			{#each tasks.filter(task => task.status === 'finished') as task}
				<Task 
					id={task.id}
					title={task.title} 
					description={task.description}
					createDate={task.createDate}
					endDate={task.endDate}
					status={task.status}
					editFunc={handleEdit}
				/>
			{/each}
			{/if}
		</div>
	</div>
	{/await}
</main>


<style>
	h3 {
		text-align: center;
	}
	.tasksContainer {
		max-width: 25%;
		margin-left: auto;
		margin-right: auto;
		flex: auto;
	}
	main {
		margin-left: auto;
		margin-right: auto;
		padding: 1em;
		max-width: 80%;
		margin: 0 auto;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	button:hover { 
        background: #E6E6FA;
		cursor: pointer;
    }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>