import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ElementType,
  type KeyboardEvent,
} from "react";
import { ArrowRight, Link, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const ORBIT_RADIUS = 200;
const ROTATION_SPEED = 0.3;

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const getRelatedItems = useCallback(
    (itemId: number): number[] => {
      const currentItem = timelineData.find((item) => item.id === itemId);
      return currentItem ? currentItem.relatedIds : [];
    },
    [timelineData]
  );

  const centerViewOnNode = useCallback(
    (nodeId: number) => {
      const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
      const totalNodes = timelineData.length;
      const targetAngle = (nodeIndex / totalNodes) * 360;
      setRotationAngle(270 - targetAngle);
    },
    [timelineData]
  );

  const toggleItem = useCallback(
    (id: number) => {
      setExpandedItems((prev) => {
        const newState = { ...prev };
        Object.keys(newState).forEach((key) => {
          const keyNum = Number.parseInt(key, 10);
          if (keyNum !== id) {
            newState[keyNum] = false;
          }
        });
        newState[id] = !prev[id];
        return newState;
      });

      setExpandedItems((prev) => {
        const isExpanding = prev[id];
        if (isExpanding) {
          setActiveNodeId(id);
          setAutoRotate(false);
          const relatedItems = getRelatedItems(id);
          const newPulseEffect: Record<number, boolean> = {};
          relatedItems.forEach((relId) => {
            newPulseEffect[relId] = true;
          });
          setPulseEffect(newPulseEffect);
          centerViewOnNode(id);
        } else {
          setActiveNodeId(null);
          setAutoRotate(true);
          setPulseEffect({});
        }
        return prev;
      });
    },
    [getRelatedItems, centerViewOnNode]
  );

  useEffect(() => {
    if (!autoRotate) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    lastTimeRef.current = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTimeRef.current;
      if (delta > 50) {
        setRotationAngle((prev) => {
          const newAngle = (prev + ROTATION_SPEED) % 360;
          return Number(newAngle.toFixed(3));
        });
        lastTimeRef.current = time;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRotate]);

  const calculateNodePosition = useCallback(
    (index: number, total: number) => {
      const angle = ((index / total) * 360 + rotationAngle) % 360;
      const radian = (angle * Math.PI) / 180;
      const x = ORBIT_RADIUS * Math.cos(radian);
      const y = ORBIT_RADIUS * Math.sin(radian);
      const zIndex = Math.round(100 + 50 * Math.cos(radian));
      const opacity = Math.max(
        0.4,
        Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
      );
      return { x, y, zIndex, opacity };
    },
    [rotationAngle]
  );

  const isRelatedToActive = useCallback(
    (itemId: number): boolean => {
      if (!activeNodeId) return false;
      return getRelatedItems(activeNodeId).includes(itemId);
    },
    [activeNodeId, getRelatedItems]
  );

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "border-white bg-black text-white";
      case "in-progress":
        return "border-black bg-white text-black";
      case "pending":
      default:
        return "border-white/50 bg-black/40 text-white";
    }
  };

  const handleNodeKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    id: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleItem(id);
    }
  };

  const nodePositions = useMemo(
    () =>
      timelineData.map((_, index) =>
        calculateNodePosition(index, timelineData.length)
      ),
    [timelineData, calculateNodePosition]
  );

  return (
    <div
      className="flex h-[46rem] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black"
      ref={containerRef}
      onClick={(event) => {
        if (
          event.target === containerRef.current ||
          event.target === orbitRef.current
        ) {
          setExpandedItems({});
          setActiveNodeId(null);
          setPulseEffect({});
          setAutoRotate(true);
        }
      }}
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center px-4">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
        >
          <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse">
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-white/20 opacity-70" />
            <div
              className="absolute h-24 w-24 animate-ping rounded-full border border-white/10 opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          <div className="absolute h-96 w-96 rounded-full border border-white/10" />

          {timelineData.map((item, index) => {
            const position = nodePositions[index];
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`${item.title} - ${item.status}`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleItem(item.id);
                }}
                onKeyDown={(event) => handleNodeKeyDown(event, item.id)}
              >
                <div
                  className={`absolute -inset-1 rounded-full ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 transform
                    ${
                      isExpanded
                        ? "scale-150 border-white bg-white text-black shadow-lg shadow-white/30"
                        : isRelated
                          ? "animate-pulse border-white bg-white/50 text-black"
                          : "border-white/40 bg-black text-white"
                    }
                  `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                    absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300
                    ${isExpanded ? "scale-125 text-white" : "text-white/70"}
                  `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 w-64 -translate-x-1/2 overflow-visible border-white/30 bg-black/90 shadow-xl shadow-white/10 backdrop-blur-lg">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(item.status)}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "PENDING"}
                        </Badge>
                        <span className="font-mono text-xs text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="mt-2 text-sm">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>

                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div
                          className="h-1 w-full overflow-hidden rounded-full bg-white/10"
                          role="progressbar"
                          aria-valuenow={item.energy}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Energy level: ${item.energy}%`}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="mb-2 flex items-center">
                            <Link
                              size={10}
                              className="mr-1 text-white/70"
                            />
                            <h4 className="text-xs font-medium uppercase tracking-wider text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (timelineItem) => timelineItem.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 rounded-none border-white/20 bg-transparent px-2 py-0 text-xs text-white/80 transition-all hover:bg-white/10 hover:text-white"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title ?? "Unknown"}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { TimelineItem };
