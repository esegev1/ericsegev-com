/**************************************************************
 *    Control the flow of placing the blog in an iFrame
 *  
 *    
 **************************************************************/
export function initializeRecipeBlog() {
    //load trhe main section and empty it
    const main = document.querySelector('.main')
    main.replaceChildren();
    console.log('test');

    const iFrame = document.createElement('iframe');
    iFrame.src=`google.com`;

    main.appendChild(iFrame);

}