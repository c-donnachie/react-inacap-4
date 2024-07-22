import * as React from 'react'
import { Button, Card, Skeleton } from '@nextui-org/react'
import { MyButton } from '../../components/MyButton/MyButton'


export const HomeScreen = () => {


    return (
        <div className='flex flex-col gap-6 w-screen items-center'>


            <MyButton title={'Botton Home'} />
            <MyButton title={'Botton 2'} color={'red'} />


            <div className='text-5xl font-bold'>Holaa</div>
            <Button color="primary">
                Button
            </Button>
            <div>
                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
            </div>
        </div>
    )
}

