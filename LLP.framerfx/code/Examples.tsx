import { Data, Override } from "framer"
// @ts-ignore
import { showNext, showPrevious } from "@framer/steveruizok.flow/code"

const data = Data({
    selected: null,
    selectedRadio: null,
    answeredQuestionCount: 0,
    currentQuestion: 0,
    isQ1Answered: false,
    isQ2Answered: false,
})

const answerBgColor = "#E8E8E8"

export function Answer(props): Override {
    const { id } = props
    const isSelected = data.selected === id
    const radio = props.children[0].props.children[0].props.id
    const correctAnswers = ["id_WaHC1isQm", "id_RGQCCzH8j"]

    return {
        variants: {
            active: {
                background: answerBgColor,
            },
            resting: {
                background: "#fff",
            },
        },
        initial: "resting",
        animate: isSelected ? "active" : "resting",
        whileHover: {
            background: answerBgColor,
        },
        onTap() {
            data.selectedRadio = radio
            data.selected = isSelected ? null : id

            if (data.currentQuestion === 1) data.isQ1Answered = true
            if (data.currentQuestion === 2) data.isQ2Answered = true

            if (data.isQ1Answered) data.answeredQuestionCount = 1
            if (data.isQ2Answered) data.answeredQuestionCount = 2

            data.currentQuestion += 1
        },
    }
}

export function Flow(props): Override {
    return {
        onChangePage(c, p) {
            console.log(c, p)
            data.currentQuestion = p
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

export function ShowOnQuestions(props): Override {
    return {
        animate: {
            opacity: data.currentQuestion === 0 ? 0 : 1,
        },
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
            data.currentQuestion += 1
        },
    }
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
