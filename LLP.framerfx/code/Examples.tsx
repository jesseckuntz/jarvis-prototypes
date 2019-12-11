import { Data, Override, useAnimation, Color, motionValue } from "framer"
import { colors } from "./canvas"

const data = Data({
    selected: null,
    selectedRadio: null,
    answeredQuestionCount: 0,
    currentQuestion: 0,
    isQ1Answered: false,
    isQ2Answered: false,
    contentOffSetY: motionValue(0),
    hasConsented: true,
    selectedBlackLetter: null,
})

const lightGrey = Color("#E8E8E8")
const actionBlue = Color("#4D6DD1")
const lightActionBlue = Color.lighten(actionBlue, 34)

export function TrackScroll(): Override {
    return {
        contentOffsetY: data.contentOffSetY,
    }
}

export function Answer(props): Override {
    const { id } = props
    const isSelected = data.selected === id
    const radio = props.children[2].props.id

    const controls = useAnimation()
    return {
        variants: {
            resting: {
                background: "#fff",
            },
            selected: {
                background: lightActionBlue,
            },
        },
        initial: "resting",
        animate: isSelected ? "selected" : "resting",
        whileHover: {
            background: lightActionBlue,
        },

        onTap() {
            data.selectedRadio = radio
            data.selected = id

            if (data.currentQuestion === 1) data.isQ1Answered = true
            if (data.currentQuestion === 2) data.isQ2Answered = true
        },
    }
    // const { id } = props
    // const isSelected = data.selected === id
    // const radio = props.children[0].props.children[0].props.id
    // const controls = useAnimation()

    // return {
    //     initial: "resting",
    //     background: "#fff",
    //     animate: controls,
    //     whileHover: {
    //         scale: 1.025,
    //     },

    //     onTap() {
    //         data.selectedRadio = radio
    //         data.selected = isSelected ? null : id

    //         if (data.currentQuestion === 1) data.isQ1Answered = true
    //         if (data.currentQuestion === 2) data.isQ2Answered = true

    //         if (data.isQ1Answered) data.answeredQuestionCount = 1
    //         if (data.isQ2Answered) data.answeredQuestionCount = 2

    //         controls.start({
    //             backgroundColor: lightActionBlue,
    //             transition: { loop: 4, duration: 0.25 },
    //         })

    //         setTimeout(() => {
    //             data.currentQuestion += 1
    //         }, 1000)
    //     },
    // }
}

export function Page(props): Override {
    const pages = props.children[0].props.children
    return {
        currentPage: data.currentQuestion,
        height: pages[data.currentQuestion].props.height,
    }
}

export function Radio(props): Override {
    const { id } = props

    const blackLetter = props.children[1].props.id

    data.selectedBlackLetter = data.selectedRadio === id ? blackLetter : null

    return {
        animate: {
            borderRadius: data.selectedRadio === id ? "50%" : 4,
            background: data.selectedRadio === id ? actionBlue : "transparent",
        },
    }
}

export function HideBlackLetter(props): Override {
    const { id } = props
    return {
        visible: data.selectedBlackLetter === id ? false : true,
    }
}

export function ShowOnQuestions(props): Override {
    return {
        animate: {
            opacity: data.currentQuestion === 0 ? 0 : 1,
        },
    }
}

export function Progress(props): Override {
    const { width } = props
    const questionCount = 3
    return {
        animate: {
            width: `${(data.answeredQuestionCount / questionCount) * 100}%`,
            borderTopRightRadius: data.answeredQuestionCount == 2 ? 4 : 0,
        },
        transition: {
            ease: "easeInOut",
            duration: 0.5,
        },
    }
}

export function NextQuestion(): Override {
    return {
        opacity:
            data.currentQuestion === 1 && data.isQ1Answered
                ? 1
                : data.currentQuestion === 0
                ? 1
                : data.currentQuestion === 2 && data.isQ2Answered
                ? 1
                : data.currentQuestion === 3
                ? 1
                : 0.5,
        onTap() {
            if (data.currentQuestion === 0) data.currentQuestion += 1
            else if (data.currentQuestion === 1 && data.isQ1Answered)
                data.currentQuestion += 1
            else if (data.currentQuestion === 2 && data.isQ2Answered)
                data.currentQuestion += 1
            else if (data.currentQuestion === 3) data.currentQuestion += 1
            else null

            if (data.isQ1Answered) data.answeredQuestionCount = 1
            if (data.isQ2Answered) data.answeredQuestionCount = 2
            if (data.currentQuestion === 4) data.answeredQuestionCount = 3

            data.contentOffSetY = motionValue(0)
        },
    }
    // return {
    //     opacity:
    //         data.currentQuestion === 1 && data.isQ1Answered
    //             ? 1
    //             : data.currentQuestion === 0
    //             ? 1
    //             : data.currentQuestion === 2 && data.isQ2Answered
    //             ? 1
    //             : 0.5,
    //     onTap() {
    //         data.currentQuestion += 1
    //     },
    // }
}

export function PreviousQuestion(): Override {
    return {
        opacity:
            data.currentQuestion === 2 && data.isQ1Answered
                ? 1
                : data.currentQuestion === 3 && data.isQ2Answered
                ? 1
                : 0.5,
        onTap() {
            data.currentQuestion -= 1
        },
    }
}

export function ToggleCheckbox(props): Override {
    return {
        icon: data.hasConsented ? "check_box" : "check_box_outline_blank",
    }
}

export function SetCheckboxState(props): Override {
    return {
        onTap() {
            data.hasConsented = !data.hasConsented
        },
    }
}
