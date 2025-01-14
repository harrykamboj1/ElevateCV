import Confetti from 'react-confetti'

const Confettii = ({ width, height }: { width: number, height: number }) => {
    return (
        <Confetti
            width={width}
            height={height}
        />
    )
}

export default Confettii;