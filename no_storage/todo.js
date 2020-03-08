var listA = [];
var listB = [];
var currentList = 'a';

/**
 * Bind event listeners
 */
function bindEvents() {
	$('#todo-list').sortable({
		handle: '.glyphicon-move',
		update: function() {
			reorderList();
		}
	});

	$('#tasktxt').off().on('keyup', function(){
		var task = $(this).val();

		if (task === '') {
			$('.glyphicon-plus').addClass('disabled');
		} else {
			$('.glyphicon-plus').removeClass('disabled');
		}

		bindEvents();
	});

	$('.tab').off().on('click', function(e) {
		var target = e.currentTarget;
		var listChoice = $(target).data('value');
		setCurrentList(listChoice);
	});

	$('.glyphicon-plus').off().on('click', function() {
		if ($(this).hasClass('disabled')) {
			return;
		}

		var task = $('#tasktxt').val();
		addItem(task);
		$('#tasktxt').val('');
	});

	$('.glyphicon-minus').off().on('click', function(e) {
		var target = e.currentTarget;
		var index = $(target).data('index');

		deleteItem(index);
	});
}

/**
 * Render the currently-selected list
 */
function render() {
	$('#todo-list').html('');
	var html = '';
	var current = getCurrentList();

	if (current.length > 0) {
		current.forEach(function(task, index) {
			html += `<div class='row'>`;
			html += `<li data-value='${task}'>`;
			html += `<span class='glyphicon glyphicon-move col-lg-2 col-md-2 col-sm-2'></span>`;
			html += `<span class='col-lg-6 col-md-6 col-sm-6'>${task}</span>`;
			html += `<span class='glyphicon glyphicon-minus col-lg-2 col-md-2 col-sm-2' data-index=${index}></span>`;
			html += `</li>`;
			html += `</div>`;
		});
	}

	$('#todo-list').html(html);
	bindEvents();
}

/**
 * Set the list currently being viewed
 * @param {string} listValue - which list was selected (a or b)
 */
function setCurrentList(listValue) {
	currentList = listValue;
	$('.tab.active').removeClass('active');

	if (listValue ==='b') {
		$('#b-tab').addClass('active');
	} else {
		$('#a-tab').addClass('active');
	}

	render();
}

/**
 * Gets the array object of the currently-viewed list
 * @returns {string[]}
 */
function getCurrentList() {
	return currentList === 'b' ? listB : listA;
}

/**
 * Replace the currentList array with a new array
 * @param {string[]} list - the new array we will use
 */
function updateCurrentList(list) {
	if (currentList === 'b') {
		listB = list;
	} else {
		listA = list;
	}
}

/**
 * Adds a task item to the current list
 * @param {string} task - the task to add
 */
function addItem(task) {
	var current = getCurrentList();
	current.push(task);
	$('.glyphicon-plus').addClass('disabled');

	render();
}

/**
 * Remove an item from the current list
 * @param {int} index - the index of the item to be deleted
 */
function deleteItem(index) {
	var current = getCurrentList();
	current.splice(index, 1);

	render();
}

/**
 * Updates the current list array object's order after drag and drop actions
 */
function reorderList() {
	var tempList = [];
	$('#todo-list li').each(function(i, item) {
		tempList.push($(item).data('value'));
	});

	updateCurrentList(tempList);
	render();
}

setCurrentList(currentList);
bindEvents();