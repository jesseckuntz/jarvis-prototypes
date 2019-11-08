import { Data, Override, Color } from "framer"
import { colors } from "./canvas"

const data = Data({
    selected: null,
    selectedRadio: null,
    answeredQuestionCount: 0,
    currentQuestion: 0,
    isQ1Answered: false,
    isQ2Answered: false,
})

const lightGrey = Color("#E8E8E8")
const actionBlue = Color("#4D6DD1")
const lightActionBlue = Color.lighten(actionBlue, 30)

export function Answer(props): Override {
    const { id } = props
    const isSelected = data.selected === id
    const radio = props.children[0].props.children[0].props.id
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
            scale: 1.025,
        },

        onTap() {
            data.selectedRadio = radio
            data.selected = id

            if (data.currentQuestion === 1) data.isQ1Answered = true
            if (data.currentQuestion === 2) data.isQ2Answered = true
        },
    }
}

export function Page(props): Override {
    return {
        currentPage: data.currentQuestion,
    }
}

export function Radio(props): Override {
    const { id } = props

    return {
        visible: data.selectedRadio === id ? true : false,
    }
}

export function Progress(props): Override {
    const { width } = props
    const questionCount = 2
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
                : 0.5,
        onTap() {
            if (data.currentQuestion === 0) data.currentQuestion += 1
            else if (data.currentQuestion === 1 && data.isQ1Answered)
                data.currentQuestion += 1
            else if (data.currentQuestion === 2 && data.isQ2Answered)
                data.currentQuestion += 1
            else null

            if (data.isQ1Answered) data.answeredQuestionCount = 1
            if (data.isQ2Answered) data.answeredQuestionCount = 2
        },
    }
}
