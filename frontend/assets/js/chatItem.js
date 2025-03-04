let items = [
    {
        headline: 'Hello',
        desctiption: 'Hello world!'
    },
    {
        headline: 'Hello',
        desctiption: 'Hello world!'
    },
    {
        headline: 'Hello',
        desctiption: 'Hello world!'
    }
];

renderItems();

function renderItems() {
    const chatItems = document.getElementById('chat');
    chatItems.innerHTML = ``;
    items.forEach((item) => {
        chatItems.innerHTML += 
        `
            <div class="chat-item">
                <h3 class="chat-item-head">
                    ${item.headline}
                </h3>
                <p class="chat-item-info">
                    ${item.desctiption}
                </p>
            </div>
        `
    })
}