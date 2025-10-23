    // utility function returning a random item from the input array
    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

    // possible values for the message title and modifier
    const messageTitle = [
    'info',
    'success',
    'warning',
    'danger',
    ];

    // possible values for the body of the message
    // end result of the emmet shortcut p*10>lorem10
    const messageText = [
    '{{notification.text}}'
    ];

    /* logic
    - create a message
    - show the message
    - allow to dismiss the message through the dismiss button

    once the message is dismissed the idea is to go through the loop one more time, with a different title and text values
    */
    const notification = document.querySelector('.notification');

    // function called when the button to dismiss the message is clicked
    function dismissMessage() {
    // remove the .received class from the .notification widget
    notification.classList.remove('received');

    // call the generateMessage function to show another message after a brief delay
    //generateMessage();
    }

    // function showing the message
    function showMessage() {
    // add a class of .received to the .notification container
    notification.classList.add('received');

    // attach an event listener on the button to dismiss the message
    // include the once flag to have the button register the click only one time
    const button = document.querySelector('.notification__message button');
    button.addEventListener('click', dismissMessage, { once: true });
    }

    // function generating a message with a random title and text
    function generateMessage() {
    // after an arbitrary and brief delay create the message and call the function to show the element
    const delay = Math.floor(Math.random() * 1000) + 500;
    const timeoutID = setTimeout(() => {


        // update the message with the random values and changing the class name to the title's option
        const message = document.querySelector('.notification__message');

        message.querySelector('h1').textContent = '{{notification.type}}';
        message.querySelector('p').textContent = '{{notification.text}}';
        message.className = `notification__message message--${'{{notification.type}}'}`;

        // call the function to show the message
        showMessage();
        clearTimeout(timeoutID);
    }, delay);
    }

    // immediately call the generateMessage function to kickstart the loop
    if('{{notification}}'){
        generateMessage();
    }
