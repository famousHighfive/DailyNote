<script setup>
import { ref, watch } from 'vue';

const userNote = ref('')
const formOpen = ref(true)
const currDay = ref('Monday')
const editingTask = ref(null)
const draggedTask = ref(null)
const modalOpen = ref(false)
const confirmModalOpen = ref(false)
const taskToDelete = ref(null)



const tasks = ref([
    { day: 'Monday', event: [] },
    { day: 'Tuesday', event: [] },
    { day: 'Wednesday', event: [] },
    { day: 'Thursday', event: [] },
    { day: 'Friday', event: [] },
    { day: 'Saturday', event: [] },
    { day: 'Sunday', event: [] },
])

watch(tasks, (newVal) => {
    localStorage.setItem('calendarTasks', JSON.stringify(newVal))
}, { deep: true })

// Au chargemnt
const saved = localStorage.getItem('calendarTasks')
if (saved) {
    tasks.value = JSON.parse(saved)
}

const selectDay = (day) => {
    currDay.value = day
    formOpen.value = true
}


function addNote() {

    if (!userNote.value.trim()) {
        modalOpen.value = true

        setTimeout(() => {
            modalOpen.value = false
        }, 3000)
        return
    }

    let foundObj = tasks.value.find(t => t.day === currDay.value)
    if (!foundObj) return

    if (editingTask.value) {
        // cas dedition
        const foundTask = foundObj.event.find(t => t.id === editingTask.value.id)

        if (foundTask) {
            foundTask.title = userNote.value
            userNote.value = ''
        }
        editingTask.value = null
    } else {
        // Ajout normal

        let task = { id: Date.now(), title: userNote.value.trim(), day: currDay.value }

        foundObj.event.push(task)
        userNote.value = ''
    }
}

function deleteTask(id, day) {
    taskToDelete.value = { id, day }
    confirmModalOpen.value = true
}

function confirmDelete() {
    if (!taskToDelete.value) return

    const { id, day } = taskToDelete.value

    let foundObj = tasks.value.find(t => t.day === day)
    if (foundObj) {
        foundObj.event = foundObj.event.filter(item => item.id !== id)
    }

    confirmModalOpen.value = false
    taskToDelete.value = null
}

function cancelDelete() {
    confirmModalOpen.value = false
    taskToDelete.value = null
}


function editTask(id, day) {


    // Trouver le jour
    let foundObj = tasks.value.find(t => t.day === day)
    if (!foundObj) return
    // trouver la tache
    let foundTask = foundObj.event.find(t => t.id === id)
    if (!foundTask) return

    // affichage dans l'input
    userNote.value = foundTask.title

    editingTask.value = { id, day }

}

function startDrag(id, fromDay) {
    draggedTask.value = { id, fromDay }
}

function handleDrop(toDay) {

    if (!draggedTask.value) return

    const { id, fromDay } = draggedTask.value

    if (fromDay === toDay) return

    // Trouver jour source 
    const sourceDay = tasks.value.find(t => t.day === fromDay)
    const targetDay = tasks.value.find(t => t.day === toDay)

    if (!sourceDay || !targetDay) return

    // Trouver la tache
    const taskIndex = sourceDay.event.findIndex(t => t.id === id)
    if (taskIndex === -1) return

    const movedTask = sourceDay.event[taskIndex]

    // supprimer du jour source
    sourceDay.event.splice(taskIndex, 1)

    // mettre a jour son jour
    movedTask.day = toDay

    // ajouter au nouveau jour
    targetDay.event.push(movedTask)

    draggedTask.value = null


}
</script>


<template>
    <div class="container-calendar flex flex-col mt-20">

        <!-- head -->
        <div class="head-calendar">
            <div class="w-full max-w-[300px] img-calendar">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="701.33071" height="400.73993"
                    viewBox="0 0 866.33071 605.73993" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path
                        d="M898.30315,567.7887a9.14581,9.14581,0,0,1,1.93088-13.89051l-7.25159-31.682,15.8187,5.91773,4.46105,29.1785a9.19542,9.19542,0,0,1-14.959,10.47626Z"
                        transform="translate(-166.83465 -147.13004)" fill="#ffb8b8"></path>
                    <path
                        d="M897.20867,542.64389l-13.906-26.88477,1.88062-67.69726.89355,1.88281c1.041,2.19336,25.44019,53.84619,23.7,71.13819l2.78882,15.80224Z"
                        transform="translate(-166.83465 -147.13004)" fill="#3f3d56"></path>
                    <polygon points="721.307 594.201 732.458 594.201 737.762 551.192 721.305 551.193 721.307 594.201"
                        fill="#ffb8b8"></polygon>
                    <path
                        d="M885.29761,737.691l21.95908-.00089h.00155a13.99379,13.99379,0,0,1,13.99352,13.99352v.45476l-35.95371.00177Z"
                        transform="translate(-166.83465 -147.13004)" fill="#2f2e41"></path>
                    <polygon points="611.134 585.727 621.877 588.714 638.511 548.699 622.655 544.29 611.134 585.727"
                        fill="#ffb8b8"></polygon>
                    <path
                        d="M776.20352,728.58778,797.36,734.47044l.00149.00042a13.99378,13.99378,0,0,1,9.7326,17.23118l-.12184.43813-34.63966-9.63139Z"
                        transform="translate(-166.83465 -147.13004)" fill="#2f2e41"></path>
                    <path
                        d="M877.02434,724.5643l-22.50366-161.126L805.91619,723.65317l-38.21692-13.04981,54.77454-214.53271.36035-.02539,57.38061-3.99121,41.45679,219.48779Z"
                        transform="translate(-166.83465 -147.13004)" fill="#2f2e41"></path>
                    <path
                        d="M871.07293,420.14509s-20.91878-10.91415-49.11366-6.36659c0,0-15.007,36.205,0,50.61758l4.0928,36.24085s38.19952,22.7378,50.93269-3.63805l-1.819-30.01391s9.09512-14.39464,1.819-24.93281A34.82081,34.82081,0,0,1,871.07293,420.14509Z"
                        transform="translate(-166.83465 -147.13004)" fill="#15803d"></path>
                    <path
                        d="M873.72307,584.98666l3.67163-76.188-10.39135-90.63379.47705-.07227c13.63086-2.05517,18.00268,21.42774,18.18213,22.42822l23.72583,134.14209Z"
                        transform="translate(-166.83465 -147.13004)" fill="#3f3d56"></path>
                    <path
                        d="M827.46624,585.78061l-41.94336-4.66016.011-.45849c.14869-6.20948,3.75879-152.2041,13.87452-162.54395,10.17553-10.40137,29.37719-5.90088,30.18969-5.70312l.40479.09765-3.45142,61.77637Z"
                        transform="translate(-166.83465 -147.13004)" fill="#3f3d56"></path>
                    <path
                        d="M835.19144,498.52321a9.14584,9.14584,0,0,1-11.90719-7.409l-31.89489-6.24893,11.83539-12.04883,28.47343,7.7813a9.19542,9.19542,0,0,1,3.49326,17.92547Z"
                        transform="translate(-166.83465 -147.13004)" fill="#ffb8b8"></path>
                    <path
                        d="M818.17132,491.20932,807.77874,488.975c-15.34229,4.61425-42.12219-11.62989-52.94593-18.84522-2.03662-1.35742-2.69726-4.04736-1.9635-7.99365a23.30978,23.30978,0,0,1,8.567-13.915l38.11975-30.2251,9.62158-1.60889,2.85791,16.19483L787.74822,458.6683l35.75244,19.46Z"
                        transform="translate(-166.83465 -147.13004)" fill="#3f3d56"></path>
                    <path
                        d="M814.06094,400.06826v-21a33.5,33.5,0,1,1,67,0v21a4.50508,4.50508,0,0,1-4.5,4.5h-58A4.50507,4.50507,0,0,1,814.06094,400.06826Z"
                        transform="translate(-166.83465 -147.13004)" fill="#2f2e41"></path>
                    <circle cx="679.37983" cy="232.67051" r="24.56103" fill="#ffb8b8"></circle>
                    <path
                        d="M820.97939,379.706a2.50023,2.50023,0,0,1-.5852-1.99317l2.90942-20.25976a2.50362,2.50362,0,0,1,1.41455-1.91895c14.85034-6.95019,29.90967-6.959,44.76-.02637a2.51921,2.51921,0,0,1,1.42871,2.03614L872.849,377.83a2.49954,2.49954,0,0,1-2.48877,2.73828h-4.92553a2.50966,2.50966,0,0,1-2.26539-1.44238l-2.12573-4.55469a1.49989,1.49989,0,0,0-2.84765.44824l-.41993,3.3584a2.50359,2.50359,0,0,1-2.48071,2.19043H822.8688A2.50013,2.50013,0,0,1,820.97939,379.706Z"
                        transform="translate(-166.83465 -147.13004)" fill="#2f2e41"></path>
                    <rect y="40.3663" width="551" height="343.11356" fill="#e6e6e6"></rect>
                    <rect x="36.94894" y="106.46612" width="100.91574" height="65.59524" fill="#fff"></rect>
                    <rect x="162.34439" y="106.46612" width="100.91574" height="65.59524" fill="#fff"></rect>
                    <rect x="287.73987" y="106.46612" width="100.91577" height="65.59524" fill="#fff"></rect>
                    <rect x="413.13531" y="106.46612" width="100.91577" height="65.59524" fill="#fff"></rect>
                    <rect x="36.94894" y="199.30861" width="100.91574" height="65.59523" fill="#fff"></rect>
                    <rect x="162.34439" y="199.30861" width="100.91574" height="65.59523" fill="#fff"></rect>
                    <rect x="287.73987" y="199.30861" width="100.91577" height="65.59523" fill="#fff"></rect>
                    <rect x="413.13531" y="199.30861" width="100.91577" height="65.59523" fill="#fff"></rect>
                    <rect x="36.94894" y="292.15109" width="100.91574" height="65.59525" fill="#fff"></rect>
                    <rect x="162.34439" y="292.15109" width="100.91574" height="65.59525" fill="#fff"></rect>
                    <rect x="287.73987" y="292.15109" width="100.91577" height="65.59525" fill="#fff"></rect>
                    <rect x="413.13531" y="292.15109" width="100.91577" height="65.59525" fill="#fff"></rect>
                    <circle cx="144.30951" cy="65.59524" r="15.13736" fill="#fff"></circle>
                    <circle cx="394.58057" cy="65.59524" r="15.13734" fill="#fff"></circle>
                    <rect x="138.25458" width="12.10989" height="69.63187" fill="#e6e6e6"></rect>
                    <rect x="388.52563" width="12.10986" height="69.63187" fill="#e6e6e6"></rect>
                    <path
                        d="M653.24859,286.39377a22.75657,22.75657,0,1,1-3.52686-12.19043A22.7566,22.7566,0,0,1,653.24859,286.39377Z"
                        transform="translate(-166.83465 -147.13004)" fill="#15803d"></path>
                    <path
                        d="M649.72173,274.20337l-22.46387,22.45975c-1.41186-2.18579-9.27765-12.34394-9.27765-12.34394A31.82748,31.82748,0,0,1,621.2,281.477l6.52259,8.69678,19.36853-19.36856A22.72652,22.72652,0,0,1,649.72173,274.20337Z"
                        transform="translate(-166.83465 -147.13004)" fill="#fff"></path>
                    <path
                        d="M402.45763,379.23627a22.75655,22.75655,0,1,1-3.52685-12.19043A22.7566,22.7566,0,0,1,402.45763,379.23627Z"
                        transform="translate(-166.83465 -147.13004)" fill="#15803d"></path>
                    <path
                        d="M398.93078,367.04584l-22.46387,22.45974c-1.41187-2.18579-9.27765-12.34393-9.27765-12.34393a31.82748,31.82748,0,0,1,3.21979-2.84222l6.52258,8.69677,19.36859-19.36856A22.72613,22.72613,0,0,1,398.93078,367.04584Z"
                        transform="translate(-166.83465 -147.13004)" fill="#fff"></path>
                    <path
                        d="M277.06218,379.23627a22.75667,22.75667,0,1,1-3.52685-12.19043A22.75667,22.75667,0,0,1,277.06218,379.23627Z"
                        transform="translate(-166.83465 -147.13004)" fill="#15803d"></path>
                    <path
                        d="M273.53533,367.04584l-22.46387,22.45974c-1.41186-2.18579-9.27765-12.34393-9.27765-12.34393a31.82748,31.82748,0,0,1,3.21979-2.84222l6.52258,8.69677,19.3686-19.36856A22.72673,22.72673,0,0,1,273.53533,367.04584Z"
                        transform="translate(-166.83465 -147.13004)" fill="#fff"></path>
                    <path d="M1032.16535,752.87h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z"
                        transform="translate(-166.83465 -147.13004)" fill="#3f3d56"></path>
                </svg>
            </div>

            <!-- Form -->
            <div class="w-full max-w-md">
                <div v-if="formOpen" class="form-calendar">
                    <h2 class="text-xl font-bold text-orange-500 mb-4">Add a new event</h2>
                    <p class="text-white font-semibold pb-4">{{ currDay }}</p>
                    <form @submit.prevent="addNote" class="flex flex-col gap-4">
                        <input type="text" v-model="userNote" placeholder="New event"
                            class="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-4 py-4 outline-none">
                        <button type="submit"
                            class="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition-all">
                            {{ editingTask ? 'Edit' : 'Submit' }}
                        </button>
                    </form>

                    <button @click="formOpen = false"
                        class="absolute top-4 right-4 cursor-pointer text-zinc-500 hover:text-white">❌</button>
                </div>
            </div>
        </div>

        <div class="main-calendar mt-6 border rounded-lg shadow-sm">
            <!-- Header  -->
            <div class="flex justify-between items-center p-6 bg-gray-50 border-b">
                <h2 class="text-3xl font-bold text-gray-800">Calendar App</h2>
                <button @click="formOpen = true"
                    class="text-white bg-orange-600 hover:bg-orange-700 transition-colors p-2 px-4 rounded text-xl flex items-center gap-2">
                    <span>➕</span> New Event
                </button>
            </div>

            <!-- Calendrier -->
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th v-for="day in tasks" :key="day.day"
                                class="border p-4 text-lg font-semibold cursor-pointer text-gray-700 w-1/7"
                                @click="selectDay(day.day)">
                                {{ day.day }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="align-top">
                            <td v-for="day in tasks" :key="'content-' + day.day" @dragover.prevent
                                @drop="handleDrop(day.day)" class="border p-2 min-h-32 h-64 cursor-pointer bg-white"
                                @click="selectDay(day.day)">
                                <div v-for="event in day.event" :key="event.id" draggable="true"
                                    @dragstart="startDrag(event.id, day.day)"
                                    class="flex flex-col bg-orange-100 border-l-4 border-orange-500 p-2 mb-2 rounded shadow-sm text-sm"
                                    :class="{ 'opacity-50': draggedTask?.id === event.id }">
                                    <span class="font-bold">{{ event.title }}</span>
                                    <div class="flex justify-between">
                                        <button @click="editTask(event.id, day.day)" class="cursor-pointer">✏️</button>
                                        <button @click="deleteTask(event.id, day.day)" class="cursor-pointer">❌</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>


    <!-- Modal -->
    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

        <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center animate-scale">

            <svg class="w-20 h-20 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

            <h3 class="text-lg font-semibold text-gray-700 mb-4">
                Notes vide ! Entrer une tâche...
            </h3>

            <button @click="modalOpen = false"
                class="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition">
                OK
            </button>

        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="confirmModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

        <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center animate-scale">

            <svg class="w-16 h-16 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>

            <h3 class="text-lg font-semibold text-gray-700 mb-6">
                Êtes-vous sûr de vouloir supprimer cette tâche ?
            </h3>

            <div class="flex justify-center gap-4">
                <button @click="cancelDelete" class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                    Annuler
                </button>

                <button @click="confirmDelete"
                    class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition">
                    Supprimer
                </button>
            </div>

        </div>
    </div>


</template>


<style scoped>
.head-calendar {
    display: flex;
    justify-content: space-around;
}

.form-calendar {
    position: relative;
    background-color: black;
    padding: 1.2rem;
    border-radius: 1rem;
}

.form-calendar>input {
    position: relative;
    background-color: black;
    padding: 1.2rem;
    border-radius: 1rem;
}

.content {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

@keyframes scaleIn {
    0% {
        transform: scale(0.8);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-scale {
    animation: scaleIn 0.2s ease-out;
}
</style>