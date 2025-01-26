import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


document.addEventListener('click', function(e) {           // <---Event listener for document 
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }    
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
})

function handleLikeClick(tweetId){          // <---Like Click handler
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]  

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    } else  {
        targetTweetObj.likes++
    }

    targetTweetObj.isLiked = !targetTweetObj.isLiked
    
    render()
}

function handleRetweetClick(tweetId) {              // <---Retweet cilck handler 

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
    
}

function handleReplyClick (replyId) {           // <--- Reply click handler
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){             // <--- New post handler 
    const tweetInput = document.getElementById("tweet-input")
    // console.log(tweetInput.value)
    if (tweetInput.value === ''){
        alert('Empty tweet box!')
    } else{
        tweetsData.unshift({
            handle: '@Arek-Scr',
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ''
    }
    
}

function getFeedHtml() {
    let feedHtml = ``

    tweetsData.forEach(function (tweet) {

        const likeIconClass = tweet.isLiked ? 'liked' : ''

        const retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''

        let repliesHtml = ''

        if (tweet.replies.length > 0) {
            // console.log(tweet.uuid)
            tweet.replies.forEach(function(reply){
                
                repliesHtml+= `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
                `
                
            })
        } 

        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular 
                            fa-comment-dots" 
                            data-reply="${tweet.uuid}"></i>
                                    ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid 
                            fa-heart ${likeIconClass}" 
                            data-like="${tweet.uuid}"></i>
                                    ${tweet.likes} 
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid 
                            fa-retweet ${retweetIconClass}" 
                            data-retweet="${tweet.uuid}"></i>
                                    ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
                </div>
        </div>
        `            
    })
    return feedHtml
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}


render()


































