"use client";

    import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuestionFormProps {
  initialData: {
    title: string;
        question01: string;
        choices01A: string;
        choices01B: string;
        choices01C: string;
        choices01D: string;
        correctAnswer01: string;
    
        question02: string;
        choices02A: string;
        choices02B: string;
        choices02C: string;
        choices02D: string;
        correctAnswer02: string;
    
        question03: string;
        choices03A: string;
        choices03B: string;
        choices03C: string;
        choices03D: string;
        correctAnswer03: string;
    
        question04: string;
        choices04A: string;
        choices04B: string;
        choices04C: string;
        choices04D: string;
        correctAnswer04: string;
    
        question05: string;
        choices05A: string;
        choices05B: string;
        choices05C: string;
        choices05D: string;
        correctAnswer05: string;
  };
  courseId: string;
  quizId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
  question01: z.string().min(1),
        choices01A: z.string().min(1),
        choices01B: z.string().min(1),
        choices01C: z.string().min(1),
        choices01D: z.string().min(1),
        correctAnswer01: z.string().min(1),
    
        question02: z.string().min(1),
        choices02A: z.string().min(1),
        choices02B: z.string().min(1),
        choices02C: z.string().min(1),
        choices02D: z.string().min(1),
        correctAnswer02: z.string().min(1),
    
        question03: z.string().min(1),
        choices03A: z.string().min(1),
        choices03B: z.string().min(1),
        choices03C: z.string().min(1),
        choices03D: z.string().min(1),
        correctAnswer03: z.string().min(1),
    
        question04:z.string().min(1),
        choices04A: z.string().min(1),
        choices04B: z.string().min(1),
        choices04C: z.string().min(1),
        choices04D: z.string().min(1),
        correctAnswer04: z.string().min(1),
    
        question05: z.string().min(1),
        choices05A: z.string().min(1),
        choices05B: z.string().min(1),
        choices05C: z.string().min(1),
        choices05D: z.string().min(1),
        correctAnswer05: z.string().min(1),
});

export const QuestionCardForm = ({
  initialData,
  courseId,
  quizId,
}: QuestionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing01, setIsEditing01] = useState(false);
  const [isEditing02, setIsEditing02] = useState(false);
  const [isEditing03, setIsEditing03] = useState(false);
  const [isEditing04, setIsEditing04] = useState(false);
  
  const toggleEdit = () => setIsEditing((current) => !current);
  const toggleEdit01 = () => setIsEditing01((current) => !current);
  const toggleEdit02 = () => setIsEditing02((current) => !current);
  const toggleEdit03 = () => setIsEditing03((current) => !current);
  const toggleEdit04 = () => setIsEditing04((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    toast.success("Quiz Created");
      await axios.post(`/api/courses/${courseId}/quiz/${quizId}`, values);
      toast.success("Quiz Created");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
    <Form {...form}>
        {isEditing && (
        <>
            <FormField
            control={form.control}
            name="question01"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'What is 2 + 2?'"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {/* Inputs for choices */}
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name={`choices01A`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices01B`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice B`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices01C`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice C`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices01D`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice D`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
            </div>
            {/* Radio group for selecting the correct answer */}
            <FormField
            control={form.control}
            name="correctAnswer01"
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel>Select the correct answer:</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                            >
                            {['A', 'B', 'C', 'D'].map((choice) => (
                                <FormItem key={choice} className="flex items-center space-x-3">
                                    <RadioGroupItem value={choice} />
                                    <FormLabel className="font-normal">{`Choice ${choice}`}</FormLabel>
                                </FormItem>
                            ))}
                            </RadioGroup>
                        </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
        </>
        )}
        {!isEditing && (
        <div className="text-sm mt-2">
            <p>Question: {initialData.question01}</p>
            <p>Choices:</p>
            <ul className="list-disc pl-6">
                <li>{initialData[`choices01A`]}</li>
                <li>{initialData[`choices01B`]}</li>
                <li>{initialData[`choices01C`]}</li>
                <li>{initialData[`choices01D`]}</li>
            </ul>
            <p>Correct Answer: {initialData.correctAnswer01}</p>
            <Button onClick={toggleEdit} variant="ghost">
            Edit Question
            </Button>
        </div>
        )}
    </Form>
    </div>
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
    <Form {...form}>
        {isEditing01 && (
        <>
            <FormField
            control={form.control}
            name="question02"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'What is 2 + 2?'"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {/* Inputs for choices */}
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name={`choices02A`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices02B`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice B`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices02C`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice C`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices02D`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice D`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
        
            </div>
            {/* Radio group for selecting the correct answer */}
            <FormField
            control={form.control}
            name="correctAnswer02"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel>Select the correct answer:</FormLabel>
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    {['A', 'B', 'C', 'D'].map((choice) => (
                        <FormItem key={choice} className="flex items-center space-x-3">
                        <RadioGroupItem value={choice} />
                        <FormLabel className="font-normal">{`Choice ${choice}`}</FormLabel>
                        </FormItem>
                    ))}
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </>
        )}
        {!isEditing01 && (
        <div className="text-sm mt-2">
            <p>Question: {initialData.question01}</p>
            <p>Choices:</p>
            <ul className="list-disc pl-6">
                <li>{initialData[`choices02A`]}</li>
                <li>{initialData[`choices02B`]}</li>
                <li>{initialData[`choices02C`]}</li>
                <li>{initialData[`choices02D`]}</li>
            </ul>
            <p>Correct Answer: {initialData.correctAnswer01}</p>
            <Button onClick={toggleEdit01} variant="ghost">
            Edit Question
            </Button>
        </div>
        )}
    </Form>
    </div>
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
    <Form {...form}>
        {isEditing02 && (
        <>
            <FormField
            control={form.control}
            name="question03"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'What is 2 + 2?'"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {/* Inputs for choices */}
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name={`choices03A`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices03B`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice B`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices03C`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice C`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices03D`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice D`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
        
            </div>
            {/* Radio group for selecting the correct answer */}
            <FormField
            control={form.control}
            name="correctAnswer03"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel>Select the correct answer:</FormLabel>
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    {['A', 'B', 'C', 'D'].map((choice) => (
                        <FormItem key={choice} className="flex items-center space-x-3">
                        <RadioGroupItem value={choice} />
                        <FormLabel className="font-normal">{`Choice ${choice}`}</FormLabel>
                        </FormItem>
                    ))}
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </>
        )}
        {!isEditing02 && (
        <div className="text-sm mt-2">
            <p>Question: {initialData.question01}</p>
            <p>Choices:</p>
            <ul className="list-disc pl-6">
                <li>{initialData[`choices01A`]}</li>
                <li>{initialData[`choices01B`]}</li>
                <li>{initialData[`choices01C`]}</li>
                <li>{initialData[`choices01D`]}</li>
            </ul>
            <p>Correct Answer: {initialData.correctAnswer01}</p>
            <Button onClick={toggleEdit02} variant="ghost">
            Edit Question
            </Button>
        </div>
        )}
    </Form>
    </div>
    {/* QUESTION 4 */}
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
    <Form {...form}>
        {isEditing03 && (
        <>
            <FormField
            control={form.control}
            name="question04"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'What is 2 + 2?'"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {/* Inputs for choices */}
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name={`choices04A`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices04B`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice B`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices04C`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice C`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices04D`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice D`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
        
            </div>
            {/* Radio group for selecting the correct answer */}
            <FormField
            control={form.control}
            name="correctAnswer04"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel>Select the correct answer:</FormLabel>
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    {['A', 'B', 'C', 'D'].map((choice) => (
                        <FormItem key={choice} className="flex items-center space-x-3">
                        <RadioGroupItem value={choice} />
                        <FormLabel className="font-normal">{`Choice ${choice}`}</FormLabel>
                        </FormItem>
                    ))}
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </>
        )}
        {!isEditing03 && (
        <div className="text-sm mt-2">
            <p>Question: {initialData.question01}</p>
            <p>Choices:</p>
            <ul className="list-disc pl-6">
                <li>{initialData[`choices04A`]}</li>
                <li>{initialData[`choices04B`]}</li>
                <li>{initialData[`choices04C`]}</li>
                <li>{initialData[`choices04D`]}</li>
            </ul>
            <p>Correct Answer: {initialData.correctAnswer01}</p>
            <Button onClick={toggleEdit03} variant="ghost">
            Edit Question
            </Button>
        </div>
        )}
    </Form>
    </div>
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
    <Form {...form}>
        {/* QUESTION 5 */}
        {isEditing04 && (
        <>
            <FormField
            control={form.control}
            name="question05"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'What is 2 + 2?'"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {/* Inputs for choices */}
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name={`choices05A`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices05B`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice B`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices05C`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice C`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name={`choices05D`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                disabled={isSubmitting}
                                placeholder={`Choice D`}
                                {...field}
                            />
                        </FormControl>
                </FormItem>
                )}
                />
        
            </div>
            {/* Radio group for selecting the correct answer */}
            <FormField
            control={form.control}
            name="correctAnswer05"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel>Select the correct answer:</FormLabel>
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    {['A', 'B', 'C', 'D'].map((choice) => (
                        <FormItem key={choice} className="flex items-center space-x-3">
                        <RadioGroupItem value={choice} />
                        <FormLabel className="font-normal">{`Choice ${choice}`}</FormLabel>
                        </FormItem>
                    ))}
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </>
        )}
        {!isEditing04 && (
        <div className="text-sm mt-2">
            <p>Question: {initialData.question01}</p>
            <p>Choices:</p>
            <ul className="list-disc pl-6">
                <li>{initialData[`choices05A`]}</li>
                <li>{initialData[`choices05B`]}</li>
                <li>{initialData[`choices05C`]}</li>
                <li>{initialData[`choices05D`]}</li>
            </ul>
            <p>Correct Answer: {initialData.correctAnswer01}</p>
            <Button onClick={toggleEdit04} variant="ghost">
            Edit Question
            </Button>
        </div>
        )}
    </Form>
    </div>
    </form>
    <Button type="submit" disabled={!isValid || isSubmitting}>
        Save Question
    </Button>
    </div>
    
  )
}