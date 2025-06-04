
import { supabase } from "@/integrations/supabase/client";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: 'process_steps' | 'raci_matrix';
  sourceId: string;
}

export class QuizGenerator {
  private usedQuestions: Set<string> = new Set();

  async generateQuestionsForChapter(
    playbookId: string, 
    phaseId: string, 
    count: number = 3
  ): Promise<QuizQuestion[]> {
    const questions: QuizQuestion[] = [];
    
    // Get process steps and RACI data for the chapter
    const [processSteps, raciData] = await Promise.all([
      this.getProcessSteps(playbookId, phaseId),
      this.getRaciData(playbookId, phaseId)
    ]);

    // Generate questions from process steps (who is responsible)
    const processQuestions = this.generateProcessStepQuestions(processSteps);
    questions.push(...processQuestions);

    // Generate questions from RACI matrix (team assignments)
    const raciQuestions = this.generateRaciQuestions(raciData);
    questions.push(...raciQuestions);

    // Filter out used questions and shuffle
    const availableQuestions = questions.filter(q => !this.usedQuestions.has(q.id));
    const shuffled = this.shuffleArray(availableQuestions);
    
    // Take the requested number of questions
    const selectedQuestions = shuffled.slice(0, count);
    
    // Mark questions as used
    selectedQuestions.forEach(q => this.usedQuestions.add(q.id));
    
    return selectedQuestions;
  }

  private async getProcessSteps(playbookId: string, phaseId: string) {
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .eq('playbook_id', playbookId)
      .eq('phase_id', phaseId);

    if (error) {
      console.error('Error fetching process steps:', error);
      return [];
    }

    return data || [];
  }

  private async getRaciData(playbookId: string, phaseId: string) {
    const { data, error } = await supabase
      .from('raci_matrix')
      .select('*')
      .eq('playbook_id', playbookId)
      .eq('phase_id', phaseId);

    if (error) {
      console.error('Error fetching RACI data:', error);
      return [];
    }

    return data || [];
  }

  private generateProcessStepQuestions(processSteps: any[]): QuizQuestion[] {
    const questions: QuizQuestion[] = [];

    processSteps.forEach((step, index) => {
      if (step.responsible && step.activity) {
        // Question about who is responsible for a specific activity
        const otherResponsibles = processSteps
          .filter(s => s.responsible && s.responsible !== step.responsible)
          .map(s => s.responsible)
          .slice(0, 3);

        if (otherResponsibles.length >= 2) {
          const options = [step.responsible, ...otherResponsibles].slice(0, 4);
          const shuffledOptions = this.shuffleArray(options);
          const correctIndex = shuffledOptions.indexOf(step.responsible);

          questions.push({
            id: `process_${step.id}_responsible`,
            question: `Who is responsible for "${step.activity}"?`,
            options: shuffledOptions,
            correctAnswer: correctIndex,
            explanation: `According to the process steps, ${step.responsible} is responsible for this activity.`,
            source: 'process_steps',
            sourceId: step.id
          });
        }
      }

      // Question about inputs/outputs if available
      if (step.inputs && step.inputs.length > 0) {
        const otherInputs = processSteps
          .filter(s => s.inputs && s.inputs.length > 0 && s.id !== step.id)
          .flatMap(s => s.inputs)
          .slice(0, 3);

        if (otherInputs.length >= 2) {
          const correctInput = step.inputs[0];
          const options = [correctInput, ...otherInputs].slice(0, 4);
          const shuffledOptions = this.shuffleArray(options);
          const correctIndex = shuffledOptions.indexOf(correctInput);

          questions.push({
            id: `process_${step.id}_input`,
            question: `What is a key input for "${step.activity}"?`,
            options: shuffledOptions,
            correctAnswer: correctIndex,
            explanation: `${correctInput} is a required input for this process step.`,
            source: 'process_steps',
            sourceId: step.id
          });
        }
      }
    });

    return questions;
  }

  private generateRaciQuestions(raciData: any[]): QuizQuestion[] {
    const questions: QuizQuestion[] = [];

    raciData.forEach((raci) => {
      if (raci.responsible && raci.task) {
        // Question about who is responsible in RACI
        const otherResponsibles = raciData
          .filter(r => r.responsible && r.responsible !== raci.responsible)
          .map(r => r.responsible)
          .slice(0, 3);

        if (otherResponsibles.length >= 2) {
          const options = [raci.responsible, ...otherResponsibles].slice(0, 4);
          const shuffledOptions = this.shuffleArray(options);
          const correctIndex = shuffledOptions.indexOf(raci.responsible);

          questions.push({
            id: `raci_${raci.id}_responsible`,
            question: `In the RACI matrix, who is responsible for "${raci.task}"?`,
            options: shuffledOptions,
            correctAnswer: correctIndex,
            explanation: `According to the RACI matrix, ${raci.responsible} is responsible for this task.`,
            source: 'raci_matrix',
            sourceId: raci.id
          });
        }
      }

      if (raci.accountable && raci.task) {
        // Question about who is accountable in RACI
        const otherAccountables = raciData
          .filter(r => r.accountable && r.accountable !== raci.accountable)
          .map(r => r.accountable)
          .slice(0, 3);

        if (otherAccountables.length >= 2) {
          const options = [raci.accountable, ...otherAccountables].slice(0, 4);
          const shuffledOptions = this.shuffleArray(options);
          const correctIndex = shuffledOptions.indexOf(raci.accountable);

          questions.push({
            id: `raci_${raci.id}_accountable`,
            question: `Who is accountable for "${raci.task}" in the RACI matrix?`,
            options: shuffledOptions,
            correctAnswer: correctIndex,
            explanation: `${raci.accountable} is accountable for this task according to the RACI matrix.`,
            source: 'raci_matrix',
            sourceId: raci.id
          });
        }
      }
    });

    return questions;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  resetUsedQuestions() {
    this.usedQuestions.clear();
  }

  getUsedQuestionsCount(): number {
    return this.usedQuestions.size;
  }
}

export const quizGenerator = new QuizGenerator();
