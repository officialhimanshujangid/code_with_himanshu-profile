'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class workout {
    date = new Date();
    id = (Date.now() + '').slice(-10)
    clicks = 0;
    constructor(coords, distance, duration) {
        this.coords = coords; // [lat,lng]
        this.duration = duration;// in min
        this.distance = distance;// in km

    }
    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]}${this.date.getDate()}`
    }
    click() {
        this.clicks++;
    }
}

class running extends workout {
    type = 'running'
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence
        this.calcPace();
        this._setDescription();
    }
    calcPace() {
        //min/km
        return this.pace = this.duration / this.distance
    }
}

class cycling extends workout {
    type = 'cycling'
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration)
        this.elevationGain = elevationGain
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed() {
        //min/km
        return this.speed = this.duration / (this.distance / 60)
    }
}


///////////////
////////////////////application architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class App {
    #map;
    #mapEvent;
    #mapZoomLevel = 13;
    #workouts = []
    constructor() {
        ///user's position
        this._getPosition();

        /// get data from local storage
        this._getLOcalStorage();


        ///attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this))
        inputType.addEventListener('change', this._toggleElevationField)
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));


    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert(`couldn't get your position`)
            })

    }

    _loadMap(position) {


        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const coords = [latitude, longitude]

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.#map);
        // handling clicks on Map
        this.#map.on('click', this._showForm.bind(this))
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work)
        })
    }

    _showForm(mapE) {
        this.#mapEvent = mapE

        form.classList.remove('hidden');
        inputDistance.focus()

    }
    _hideForm() {
        inputDistance.value = inputCadence.value = inputElevation.value = inputDuration.value = '';
        form.style.display = 'none';
        form.classList.add('hidden')
        setTimeout(() => form.style.display = 'grid', 1000)
    }
    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')

    }

    _newWorkout(e) {
        /// some helper functions
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp))

        const clearInputFields = () => inputDistance.value = inputCadence.value = inputElevation.value = inputDuration.value = '';

        const allPositiveNumbers = (...inputs) => inputs.every(inp => inp > 0)


        e.preventDefault();

        ///get data from form
        const type = inputType.value
        const distance = +inputDistance.value
        const duration = +inputDuration.value
        const { lat, lng } = this.#mapEvent.latlng
        let workout;

        ///if workout running create running object
        if (type === 'running') {
            const cadence = +inputCadence.value
            /// check data 
            if (!validInputs(distance, duration, cadence) || !allPositiveNumbers(distance, duration, cadence)) {
                clearInputFields();
                return alert('input Have to be positive number');
            }
            workout = new running([lat, lng], distance, duration, cadence);
        }
        //// if workout cyling create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            // check if data is valid
            if (!validInputs(distance, duration, elevation) || !allPositiveNumbers(distance, duration)) {
                clearInputFields();
                return alert('input Have to be positive number');
            }
            workout = new cycling([lat, lng], distance, duration, elevation);
        }

        //// add new object to workout arrays
        this.#workouts.push(workout)



        /// render workout on map as a marker
        this._renderWorkoutMarker(workout)


        /// render workout on list
        this._rederWorkout(workout);

        // clear input fields + hide the form
        this._hideForm();

        /// set local storage to all workout
        this._setLocalStorage();

    }
    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup(
                {
                    maxWidth: 150,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚲'} ${workout.description}`)
            .openPopup();
    }
    _rederWorkout(workout) {

        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚲'}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        `
        if (workout.type === 'running') {
            html +=
                `
              <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
              </div>
             <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
               <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
             </div>
             </li>
               `}

        else if (workout.type === 'cycling') {
            html +=
                `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
              </div>
            </li>
               `}

        form.insertAdjacentHTML('afterend', html);

    }
    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout')

        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id)

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true, pan: {
                duration: 1,
            },
        })
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }

    _getLOcalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'))

        if (!data) return;
        this.#workouts = data;
        this.#workouts.forEach(work => {
            this._rederWorkout(work)
        })
    }
    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }

}

const app = new App();


