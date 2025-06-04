
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

    console.log('Process steps for quiz generation:', processSteps);
    console.log('RACI data for quiz generation:', raciData);

    // Generate questions from process steps
    const processQuestions = this.generateProcessStepQuestions(processSteps);
    questions.push(...processQuestions);

    // Generate questions from RACI matrix
    const raciQuestions = this.generateRaciQuestions(raciData);
    questions.push(...raciQuestions);

    console.log('All generated questions:', questions);

    // Filter out used questions and shuffle
    const availableQuestions = questions.filter(q => !this.usedQuestions.has(q.id));
    const shuffled = this.shuffleArray(availableQuestions);
    
    // Take the requested number of questions
    const selectedQuestions = shuffled.slice(0, count);
    
    // Mark questions as used
    selectedQuestions.forEach(q => this.usedQuestions.add(q.id));
    
    console.log('Selected questions for quiz:', selectedQuestions);
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

    // Collect all unique responsible parties and inputs for generating alternatives
    const allResponsibles = [...new Set(processSteps.map(s => s.responsible).filter(Boolean))];
    const allInputs = [...new Set(processSteps.flatMap(s => s.inputs || []).filter(Boolean))];

    processSteps.forEach((step, index) => {
      if (step.responsible && step.activity) {
        // Create alternatives by excluding the correct answer
        const alternatives = allResponsibles.filter(r => r !== step.responsible);
        
        if (alternatives.length >= 2) {
          // Take exactly 2 alternatives and add the correct answer
          const selectedAlternatives = alternatives.slice(0, 2);
          const options = [step.responsible, ...selectedAlternatives];
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

      // Question about inputs if available
      if (step.inputs && step.inputs.length > 0) {
        const correctInput = step.inputs[0];
        // Create alternatives by excluding the correct answer
        const alternatives = allInputs.filter(input => input !== correctInput);
        
        if (alternatives.length >= 2) {
          // Take exactly 2 alternatives and add the correct answer
          const selectedAlternatives = alternatives.slice(0, 2);
          const options = [correctInput, ...selectedAlternatives];
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

    // Collect all unique roles for generating alternatives
    const allResponsibles = [...new Set(raciData.map(r => r.responsible).filter(Boolean))];
    const allAccountables = [...new Set(raciData.map(r => r.accountable).filter(Boolean))];

    raciData.forEach((raci) => {
      if (raci.responsible && raci.task) {
        // Create alternatives by excluding the correct answer
        const alternatives = allResponsibles.filter(r => r !== raci.responsible);
        
        if (alternatives.length >= 2) {
          // Take exactly 2 alternatives and add the correct answer
          const selectedAlternatives = alternatives.slice(0, 2);
          const options = [raci.responsible, ...selectedAlternatives];
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
        // Create alternatives by excluding the correct answer
        const alternatives = allAccountables.filter(a => a !== raci.accountable);
        
        if (alternatives.length >= 2) {
          // Take exactly 2 alternatives and add the correct answer
          const selectedAlternatives = alternatives.slice(0, 2);
          const options = [raci.accountable, ...selectedAlternatives];
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
