import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput {
    @Field(() => Int)
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;
}
