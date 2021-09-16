import type { NextPage } from 'next';
import Grid from '../../components/grid';


const PlayFull: NextPage = () => {
    return (
        <>
            <Grid full={true} overflow="hidden"></Grid>
        </>
    )
}
export default PlayFull;