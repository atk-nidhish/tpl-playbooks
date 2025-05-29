
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, User, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CertificationScore {
  id: string;
  user_name: string;
  user_department: string;
  playbook_name: string;
  score: number;
  completed_at: string;
}

export const Leaderboard = () => {
  const [scores, setScores] = useState<CertificationScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      // Using type assertion since Supabase types haven't been updated yet
      const { data, error } = await (supabase as any)
        .from('certification_scores')
        .select('*')
        .order('score', { ascending: false })
        .order('completed_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-semibold text-gray-500">#{index + 1}</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  if (loading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-500" />
            Certification Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading leaderboard...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-orange-500" />
          Certification Leaderboard
        </CardTitle>
        <p className="text-sm text-gray-600">Top performers in playbook certifications</p>
      </CardHeader>
      <CardContent>
        {scores.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No certification scores available yet.</p>
        ) : (
          <div className="space-y-3">
            {scores.map((score, index) => (
              <div 
                key={score.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  index < 3 ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getRankIcon(index)}
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold text-gray-900">{score.user_name}</span>
                    </div>
                    {score.user_department && (
                      <div className="flex items-center gap-2 mt-1">
                        <Building className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{score.user_department}</span>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      {score.playbook_name} • {new Date(score.completed_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge className={`font-bold ${getScoreColor(score.score)}`}>
                  {score.score}%
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
