import type { NextPage } from 'next';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import SiteHead from '../components/SiteHead';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import LinkExternal from '../components/Links/LinkExternal';

import 'react-accessible-accordion/dist/fancy-example.css';
const LessonsPage: NextPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <SiteHead title='Piano Lessons - William Perry' description='William Perry is a pianist residing in Cincinnati, Ohio. He brings to every musical endeavor a unique perspective as a classical pianist, jazz pianist, electronic keyboardist and educator.' url='lessons' image='' />
      <PageHeader />
      <main className='bg-white text-wpBlack w-full flex flex-1 flex-col text-center items-center justify-center px-9'>
        <section id='lessons'>
          <div className='max-md:mt-10 md:mt-20 mb-28 max-w-[1000px]'>
            <h1 className='mb-4'>Piano Lessons</h1>
            <div className='flex max-md:flex-col md:flex-row max-md:text-center md:text-left max-md:items-center md:items-left gap-x-10 gap-y-6'>
              <div className='max-w-[280px]'>
                <h2 className='mt-8 mb-4'>Customized Learning</h2>
                <p className='text-xl'>Every piano lesson takes into account your goals as a student. Learn the music you want while getting the skills you need to meet those goals.</p>
              </div>
              <div className='max-w-[280px]'>
                <h2 className='mt-8 mb-4'>Convenient Scheduling</h2>
                <p className='text-xl'>Take your lessons in your home, at my studio, or online at times that are convenient for you. You always pay the same, no matter what location you pick. We can even work out a hybrid plan!</p>
              </div>
              <div className='max-w-[280px]'>
                <h2 className='mt-8 mb-4'>All Ages and Styles</h2>
                <p className='text-xl'>Whether you are just starting out, have been playing for years or want to develop a specialized skill at the piano, I can help you.</p>
              </div>
            </div>
          </div>
        </section>

        <section id='inquire'>
          <h2 className='mb-6'>Inquire about Lessons Now!</h2>
          <p className='text-xl'>Send an email to <LinkExternal className='max-sm:break-all' href='mailto:contact@william-perry.com?subject=Piano Lesson Inquiry - William-Perry.com&body=Inquire about weekly piano lessons (online or in-person: your home or at the studio in Cincinnati) (30, 45, or 60 minutes) with William Perry. Please include the student name(s) and necessary contact information along with any notes about availability.' title='Contact William Perry via Email at Contact@William-Perry.com'>Contact@William-Perry.com</LinkExternal></p>
        </section>

        <section id='faq'>
          <div className='max-md:mt-28 md:mt-24 mb-12 max-w-[1000px] text-left'>
            <h2 className='mb-4'>Frequently Asked Questions</h2>
            <Accordion>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    What is your Teaching Philosophy?
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <h3 className='text-3xl'>What is your Teaching Philosophy?</h3>
                  <p className='my-4'>My first and most important goal as a piano teacher is to guide my students to their goals. I do not have a one-size-fits-all approach to piano lessons and because I understand that each piano student has distinct goals, schedules, and learning styles and that no two students are exactly alike, my online piano lessons incorporate a wide range of techniques, concepts and styles to accommodate everyone. Whether you are a beginning or advanced student, interested in classical, or pop music, or looking for broad coaching in other musical skills like performing, playing by ear, composing or improvising, you’ll get a program that best suits your needs and your goals.</p>
                  <p className='my-4'>My first and most important goal as a piano teacher is to guide my students to their goals. I do not have a one-size-fits-all approach to piano lessons and because I understand that each piano student has distinct goals, schedules, and learning styles and that no two students are exactly alike, my online piano lessons incorporate a wide range of techniques, concepts and styles to accommodate everyone. Whether you are a beginning or advanced student, interested in classical, or pop music, or looking for broad coaching in other musical skills like performing, playing by ear, composing or improvising, you’ll get a program that best suits your needs and your goals.</p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    What if I have to Miss a Lesson?
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <h3 className='text-3xl'>What if I have to Miss a Lesson?</h3>
                  <p className='my-4'>If you have to miss a lesson, please give me 48 hours notice. If you notify me within that time frame you will be given a makeup for that lesson, at no charge. If you don’t arrive for your lesson at all or notify me in less than 24 hours, you’ll not receive the makeup lesson. This is a fairly standard rule that most music studios implement to help keep the schedule running smoothly.</p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    What is the Billing Cycle?
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <h3 className='text-3xl'>What is the Billing Cycle?</h3>
                  <p className='my-4'>When you sign up for private lessons, you will be charged the full price of a monthly subscription which will renew each month on the first of the month. For example: if you sign up for lessons on January 20, you’ll pay the full fee. Then you’ll be charged again on February 1, March 1, etc. If you sign up in the middle or end of your first month, you will be credited with the appropriate amount of lessons you’ve paid for.</p>
                  <p className='my-4'>The monthly subscription guarantees you 45 piano lessons per year. Months where you would have more than 4 lessons count towards your yearly total of 45. This means that there is a total of 7 weeks off per year, baked into the schedule. Those will be spread out evenly throughout the year and usually coincide with holidays.</p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id='testimonials'>
          <div className='mt-20 mb-28 max-w-[1000px] text-left'>
            <h2 className='mb-4'>Testimonials</h2>
            <div className='flex flex-col text-left items-center gap-y-6'>
              <div>
                <h2 className='mt-8 mb-4 text-2xl'>Will B. from Ohio</h2>
                <p className='text-xl'>“I took up playing piano at 41 and William Perry has helped me immensely. With playing technique, reading music, understanding theory. He teaches in a way that makes everything make sense. Not skipping around. Step by step. On top of that he is very is easy to get along with. He’s been instructing me for a long time and I plan on him instructing me for years!”</p>
              </div>
              <div>
                <h2 className='mt-8 mb-4 text-2xl'>Erin W. from Ohio</h2>
                <p className='text-xl'>“William has been an excellent teacher. He spent time evaluating my skill level and developed a lesson plan to help me progress. I have seen great improvement in sight reading skills in just a few months, and the pieces we work on are both challenging and fun. He is encouraging and patient.”</p>
              </div>
              <div>
                <h2 className='mt-8 mb-4 text-2xl'>Elizabeth F. from Washington</h2>
                <p className='text-xl'>“My 9 year old daughter has been taking online piano lessons with William for several years. She has come a long way and is doing really well with William as a teacher. He is very patient with her and makes lessons fun. We’ve always had a hard time getting her to stick with activities but she absolutely loves learning piano! Lately they’ve been working on some interesting/fun pieces and she loves practicing them every free minute she has. The online lessons have worked great for us… more convenient. William is a great teacher! You won’t be disappointed.”</p>
              </div>
              <div>
                <h2 className='mt-8 mb-4 text-2xl'>Brad F. from California</h2>
                <p className='text-xl'>“Lessons with William have been a blast. He is not only a skilled and well-trained piano instructor, he also makes the lessons enjoyable. Lessons are tailored to each student’s needs and desires for piano. William is willing to incorporate various genres of music into our lessons, keeping me intrigued by playing music I enjoy. He is patient and takes the time necessary to explain aspects of piano that are more challenging for me. I recommend William highly. He is an excellent instructor for both children and adults.”</p>
              </div>
              <div>
                <h2 className='mt-8 mb-4 text-2xl'>Jim M. from Virginia</h2>
                <p className='text-xl'>“I met William as an adult beginner piano student. Like many adult students I took lessons for a year or so in elementary school but did not continue. A little less than two years ago I decided to explore piano again. After wandering around the world of online and other self-taught methods I decided to get serious. That’s when I found William. Working with William has really provided the structure I need in order to advance. I find William’s style to be focused and friendly but businesslike. He challenges me where he has seen room for improvement – for me this has been sight reading and dynamics. His setup for lessons via Zoom is great, including an overhead camera view of his keyboard. I’ve already recommended William to a work colleague and I am glad to share my enthusiastic recommendation here.”</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div >
  );
};

export default LessonsPage;