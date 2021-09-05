export const PageAnimation = {
    hidden:{
        opacity:0,
        scale: .98
    },
    show:{
        opacity:1,
        scale:1,
        transition:{
            duration:.2,
            ease:"easeIn"
        }
    },
    exit:{
        opacity:0,
        scale: 1.05,
        transition:{
            duration:.2,
            ease:"easeOut"
        }
    }
}