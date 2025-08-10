function buildCommentPrompt(aiName, character, relationToUser, post) {
    const promptHeader = 'Please comment the following blog post as the role assigned to you'
    + 'I will assign to you a name, a character, and I will specify your relationship'
    + 'with the author of this post.\n'
    + 'please keep your comment shorter than 10 sentences';
    return promptHeader 
    + `Your name is: ${aiName}\n`
    + `Your character is ${character}\n`
    + `Your relationship to the author of post is ${relationToUser}\n`
    + `the title and the content of the post are ${post}`;
}

export {buildCommentPrompt}